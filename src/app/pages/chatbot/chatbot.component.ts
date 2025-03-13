import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ChatbotService } from '../../services/chatbot.service';
import { MatIconModule } from '@angular/material/icon';
import { v4 as uuidv4 } from 'uuid';
import { Router, RouterLink } from '@angular/router';
import { ProspectsStore } from '../../store/prospects.store';
import { CompanyStore } from '../../store/company.store';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './chatbot.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatWindow') chatWindow!: ElementRef;
 @ViewChild('openTabLink') openTabLink!: ElementRef<HTMLAnchorElement>;
 absoluteUrl: any;
  isTextareaEmpty: boolean = true;
  product: any;
  loading: boolean = false;
  isSidebarOpen: boolean = true;
  showUploadBadge: boolean = false;
  showNewChatBadge: boolean = false;
  showToggleBadge: boolean = false;
  showEllipsisBadge: number | null = null;
  activeModalIndex: number | null = null;
  isDarkMode: boolean = false;
  sessionId = '';
  conversation: any[] = [];
  prospects: any = null;
  private previousProspects: any = null;
  constructor(
    private themeService: ThemeService,
    private chatbotService: ChatbotService,
    private router: Router,
    private prospectsStore: ProspectsStore,
    private compantStore: CompanyStore
  ) {
    this.themeService.currentTheme.subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }

  ngOnInit(): void {
    this.sessionId = localStorage.getItem('sessionId')!;
    this.absoluteUrl = location.origin + this.router.serializeUrl(this.router.createUrlTree(['/prospects']));
  }

  open() {
    const absoluteUrl = location.origin + this.router.serializeUrl(this.router.createUrlTree(['/prospects']));
    this.openTabLink.nativeElement.href = absoluteUrl;
    console.log(absoluteUrl);
    this.openTabLink.nativeElement.click();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatWindow) {
      this.chatWindow.nativeElement.scrollTop =
        this.chatWindow.nativeElement.scrollHeight;
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleModal(i: number): void {
    if (this.activeModalIndex === i) {
      this.activeModalIndex = null;
    } else {
      this.activeModalIndex = i;
      this.showEllipsisBadge = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.modal') && !target.closest('.ellipsis-icon')) {
      this.activeModalIndex = null;
    }
  }

  adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    const maxHeight = 200;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';

    if (textarea.scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  }

  prompts: any[] = [
    {
      question: 'What’s your company name?',
      answer:
        'AI offers numerous benefits across various fields, making processes more efficient, accurate, and cost-effective. One of its primary advantages is automation, which helps eliminate repetitive tasks, increase productivity, and minimize human errors. AI also enhances decision-making by providing data-driven insights, enabling businesses to predict trends and make informed choices.',
    },
  ];

  QUESTIONS_MAP: Record<string, string> = {
    company_name: 'What’s your company name?',
    dba: 'Do you have any DBA (Doing Business As) name?',
    products_services: 'What are your main products or services?',
    buyer_industries: 'Which industries do your buyers belong to?',
    web_url: 'What is your preferred web URL for potential clients?',
    target_region: 'Which regions are you targeting?',
    target_industries: 'What industries or SIC/NAICS codes are you targeting?',
    preferred_company_size: 'Any preference on company size?',
    preferred_contact_department:
      'Which department/job level would you prefer to talk to?',
    preferred_industry_keywords: 'Any keywords that define your industry?',
    tech_stack: 'Which technologies are relevant to your clients?',
  };

  ANSWER_MAP: Record<string, string> = {};
  questionKeys = Object.keys(this.QUESTIONS_MAP);
  currentQuestionIndex = 0;

  async onSubmitAnswer(event: Event, textarea: HTMLTextAreaElement) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    const question = textarea.value.trim();
    this.conversation.push({role: "user",content: question})
    if (!question) return;
    this.loading = true;
    this.chatbotService
      .conservation({
      user_input: question,
      session_id: this.sessionId,
      })
      .subscribe({
      next: (data) => {
        this.conversation = data.conversation;
        this.prospects = data.prospect_output;
        if (this.prospects != null) {
          this.prospectsStore.setProspects(data.prospect_output.results);
          this.compantStore.setCompany(data.standardized_json);
          setTimeout(() => {
            this.open();
          }, 0);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Conversation:', error);
        this.loading = false;
      },
    });
  
    textarea.value = '';
    this.onTextareaInput(textarea);

    // const currentKey = this.questionKeys[this.currentQuestionIndex];
    // if (this.currentQuestionIndex < this.questionKeys.length) {
    //   this.ANSWER_MAP[currentKey] = answer;
    //   if (this.currentQuestionIndex == this.questionKeys.length - 1) {
    //     this.getProductData();
    //   }
    // }
    // textarea.value = '';
    // this.onTextareaInput(textarea);
    // if (this.currentQuestionIndex === this.questionKeys.length - 1) {
    //   console.log(this.currentQuestionIndex);
    // }
    // if (this.currentQuestionIndex === this.questionKeys.length) {
    //   return;
    // }

    // if (this.currentQuestionIndex < this.questionKeys.length) {
    //   this.currentQuestionIndex++;
    // }
  }
  onTextareaInput(textarea: HTMLTextAreaElement) {
    this.isTextareaEmpty = textarea.value.trim().length === 0;
  }

  getProductData(): void {
    // this.loading = true;
    // this.chatbotService.getProduct().subscribe({
    //   next: (data) => {
    //     console.log('Product Data:', data);
    //     this.product = data;
    //     this.loading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching product:', error);
    //     this.loading = false;
    //   },
    // });
  }
}
