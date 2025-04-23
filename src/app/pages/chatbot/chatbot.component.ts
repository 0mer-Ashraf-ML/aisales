import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnInit,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ChatbotService } from '../../services/chatbot.service';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProspectsService } from '../../services/prospects.service';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { ChatHistoryService } from '../../services/chatHistory.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatWindow') chatWindow!: ElementRef;
  @ViewChild('openTabLink') openTabLink!: ElementRef<HTMLAnchorElement>;

  absoluteUrl: any;
  isTextareaEmpty: boolean = true;
  loading: boolean = false;
  isDarkMode: boolean = false;
  sessionId = '';
  conversation: any[] = [];
  prospects: any = null;
  showProspects: boolean = false;
  companyId: any;

  constructor(
    private themeService: ThemeService,
    private chatbotService: ChatbotService,
    private router: Router,
    private prospectsService: ProspectsService,
    private companysrv: CompanyService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private chathistorySrv: ChatHistoryService,
    private commonSrv: CommonService,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.themeService.currentTheme.subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }
  queryMessage: string = '';

  ngOnInit(): void {
    this.showProspects = false;
    this.absoluteUrl =
      location.origin +
      this.router.serializeUrl(this.router.createUrlTree(['/prospects']));

    this.route.queryParams.subscribe((params) => {
      this.queryMessage = params['message'];

      try {
        if (params['sessionId']) {
          this.sessionId = params['sessionId'];
          localStorage.setItem('sessionId', this.sessionId);

          this.chathistorySrv.getSpecificChatHistory(this.sessionId).subscribe(
            (data) => {
              this.conversation = data.conversation;
              if (data.company_id) {
                this.companyId = data.company_id;
                this.showProspects = true;
              }
            },
            (error) => {
              console.error('Error fetching specific chat history:', error);
            }
          );
        } else {
          localStorage.setItem('sessionId', uuidv4());
          this.sessionId = localStorage.getItem('sessionId')!;
        }

        if (this.queryMessage && this.queryMessage.trim() !== '') {
          this.startConversation(this.queryMessage);
        }
      } catch (err) {
        console.error('Error during initialization:', err);
      }
    });
  }

  startConversation(message: string) {
    const textarea: HTMLTextAreaElement = document.querySelector('textarea')!;
    textarea.value = message;
    this.onSubmitAnswer(
      new KeyboardEvent('keydown', { key: 'Enter' }),
      textarea
    );
  }

  open() {
    const absoluteUrl =
      location.origin +
      this.router.serializeUrl(this.router.createUrlTree(['/prospects']));
    this.openTabLink.nativeElement.href = absoluteUrl;
    console.log(absoluteUrl);
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
      maxHeight
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
    this.showProspects = false;
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    const question = textarea.value.trim();
    if (!question) return;

    // 1. Reset the textarea height immediately after pressing enter
    textarea.style.height = '48px';  // Reset to min height
    textarea.style.overflowY = 'hidden';  // Ensure scroll is hidden

    // 2. Push the user message to conversation
    this.conversation.push({ role: 'user', content: question });

    // 3. Let the DOM settle and scroll to the bottom
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.scrollToBottom();
      });
    });

    // 4. Manually trigger change detection
    this.cdRef.detectChanges();

    // 5. Perform API call
    this.loading = true;

    this.chatbotService
      .conservation({
        user_input: question,
        session_id: this.sessionId,
        user_id: this.commonSrv.getUser()?.id,
      })
      .subscribe({
        next: (data) => {
          this.conversation = data.conversation;
          this.prospects = data.prospect_output;

          // Process company and prospects logic here...

          // After API response, stop loading
          this.loading = false;

          // Scroll to bottom after response
          this.scrollToBottom();
        },
        error: (error) => {
          console.error('Error fetching Conversation:', error);
          this.toaster.error(error, 'Error');
          this.loading = false;
        },
      });
}



  onTextareaInput(textarea: HTMLTextAreaElement) {
    this.isTextareaEmpty = textarea.value.trim().length === 0;
  }
}
