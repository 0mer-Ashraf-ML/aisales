import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  HostListener,
  inject,
} from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ChatbotService } from '../../../services/chatbot.service';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProspectsService } from '../../../services/prospects.service';
import { CompanyService } from '../../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { ChatHistoryService } from '../../../services/chatHistory.service';
import { CommonService } from '../../../services/common.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatWindow') chatWindow!: ElementRef;
  @ViewChild('openTabLink') openTabLink!: ElementRef<HTMLAnchorElement>;

  // Services
  private readonly themeService = inject(ThemeService);
  private readonly chatbotService = inject(ChatbotService);
  private readonly router = inject(Router);
  private readonly prospectsService = inject(ProspectsService);
  private readonly companyService = inject(CompanyService);
  private readonly toastr = inject(ToastrService);
  private readonly route = inject(ActivatedRoute);
  private readonly chatHistoryService = inject(ChatHistoryService);
  private readonly commonService = inject(CommonService);
  private readonly cdRef = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);

  // Component state
  absoluteUrl: string = '';
  isTextareaEmpty: boolean = true;
  loading: boolean = false;
  isDarkMode: boolean = false;
  sessionId: string = '';
  conversation: any[] = [];
  prospects: any = null;
  showProspects: boolean = false;
  companyId: string | null = null;
  showDropdown: boolean = false;
  queryMessage: string = '';

  ngOnInit(): void {
    this.showProspects = false;
    this.absoluteUrl = location.origin + this.router.serializeUrl(this.router.createUrlTree(['/prospects']));

    this.themeService.currentTheme.subscribe((theme) => {
      this.isDarkMode = theme;
    });

    this.route.queryParams.subscribe({
      next: (params) => {
        this.queryMessage = params['message'];

        try {
          if (params['sessionId']) {
            this.sessionId = params['sessionId'];
            localStorage.setItem('sessionId', this.sessionId);

            this.chatHistoryService.getSpecificChatHistory(this.sessionId).subscribe({
              next: (data) => {
                this.conversation = data.conversation;
                if (data.company_id) {
                  this.companyId = data.company_id;
                  this.showProspects = true;
                }
              },
              error: (error) => {
                if (error instanceof HttpErrorResponse) {
                  this.toastr.error(error.error?.message || 'Failed to load chat history');
                } else {
                  this.toastr.error('An unexpected error occurred while loading chat history');
                }
              }
            });
          } else {
            localStorage.setItem('sessionId', uuidv4());
            this.sessionId = localStorage.getItem('sessionId')!;
          }

          if (this.queryMessage && this.queryMessage.trim() !== '') {
            this.startConversation(this.queryMessage);
          }
        } catch (err) {
          this.toastr.error('Failed to initialize chat session');
          console.error('Error during initialization:', err);
        }
      },
      error: (error) => {
        this.toastr.error('Failed to load chat parameters');
        console.error('Error loading query params:', error);
      }
    });
  }

  startConversation(message: string) {
    const textarea: HTMLTextAreaElement = document.querySelector('textarea')!;
    textarea.value = message;
    this.onSubmitAnswer(
      new KeyboardEvent('keydown', { key: 'Enter' }),
      textarea,
    );
  }

  open() {
    const absoluteUrl = location.origin + this.router.serializeUrl(this.router.createUrlTree(['/prospects']));
    this.openTabLink.nativeElement.href = absoluteUrl;
    this.openTabLink.nativeElement.click();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatWindow.nativeElement.scrollTo({
        top: this.chatWindow.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    } catch (err) {
      console.error('scrollToBottom error:', err);
    }
  }

  adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    const maxHeight = 160;
    const minHeight = 48;

    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, minHeight),
      maxHeight,
    );
    textarea.style.height = `${newHeight}px`;

    if (textarea.scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  async onSubmitAnswer(event: Event, textarea: HTMLTextAreaElement) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    const question = textarea.value.trim();
    if (!question) {
      this.toastr.error('Please enter a message');
      return;
    }

    this.showProspects = false;
    this.conversation.push({ role: 'user', content: question });

    // Clear and reset textarea
    textarea.value = '';
    this.isTextareaEmpty = true;
    textarea.style.height = '48px';
    textarea.style.overflowY = 'hidden';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.scrollToBottom();
      });
    });

    this.cdRef.detectChanges();
    this.loading = true;

    this.chatbotService.conservation({
      user_input: question,
      session_id: this.sessionId,
      user_id: this.commonService.getUser()?.id,
    }).subscribe({
      next: (data) => {
        this.conversation = data.conversation;
        this.prospects = data.prospect_output;

        if (this.prospects != null) {
          try {
            const std = data.standardized_json;
            const comp = { ...std, session_id: this.sessionId };
            
            this.companyService.postCompany(comp).subscribe({
              next: (company) => {
                this.companyId = company.data.id;

                const prospectsWithCompany = data.prospect_output.results.map((pros: any) => ({
                  ...pros,
                  company_id: company.data.id,
                }));

                this.prospectsService.uploadProspects(prospectsWithCompany).subscribe({
                  next: () => {
                    this.ngZone.run(() => {
                      this.showProspects = true;
                    });
                    this.toastr.success('Prospects processed successfully');
                  },
                  error: (uploadErr) => {
                    if (uploadErr instanceof HttpErrorResponse) {
                      this.toastr.error(uploadErr.error?.message || 'Failed to upload prospects');
                    } else {
                      this.toastr.error('An unexpected error occurred while uploading prospects');
                    }
                  }
                });
              },
              error: (companyErr) => {
                if (companyErr instanceof HttpErrorResponse) {
                  this.toastr.error(companyErr.error?.message || 'Failed to create company record');
                } else {
                  this.toastr.error('An unexpected error occurred while creating company');
                }
              }
            });
          } catch (error) {
            this.toastr.error('Failed to process company data');
            console.error('Unexpected error during company service call:', error);
          }

          setTimeout(() => {
            this.open();
          }, 0);
        }

        this.loading = false;
        this.scrollToBottom();
      },
      error: (error) => {
        this.loading = false;
        if (error instanceof HttpErrorResponse) {
          this.toastr.error(error.error?.message || 'Failed to get chatbot response');
        } else {
          this.toastr.error('An unexpected error occurred');
        }
        console.error('Error fetching Conversation:', error);
      }
    });
  }

  onTextareaInput(textarea: HTMLTextAreaElement) {
    this.isTextareaEmpty = textarea.value.trim().length === 0;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.relative');
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }

  logout() {
    this.commonService.logout();
    this.router.navigate(['/login']);
  }

  goToAccount() {
    this.router.navigate(['/account']);
  }

  goToProjects() {
    this.router.navigate(['/account/projects']);
  }
}