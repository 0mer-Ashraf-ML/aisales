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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProspectsStore } from '../../store/prospects.store';
import { CompanyStore } from '../../store/company.store';
import { ProspectsService } from '../../services/prospects.service';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';

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
    private compantStore: CompanyStore,
    private prospectsService: ProspectsService,
    private companysrv: CompanyService,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {
    this.themeService.currentTheme.subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }
  queryMessage: string = '';

  ngOnInit(): void {
    this.sessionId = localStorage.getItem('sessionId')!;
    this.absoluteUrl = location.origin + this.router.serializeUrl(this.router.createUrlTree(['/prospects']));
  
    this.route.queryParams.subscribe(params => {
      this.queryMessage = params['message'];
      if (this.queryMessage && this.queryMessage.trim() !== '') {
        this.startConversation(this.queryMessage);
      }
    });
  }
  
  startConversation(message: string) {
    const textarea: HTMLTextAreaElement = document.querySelector('textarea')!;
    textarea.value = message; 
    this.onSubmitAnswer(new KeyboardEvent('keydown', { key: 'Enter' }), textarea);
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

  // data = [
  //   {
  //      "country":"China",
  //      "company_name":"金叶天成（北京）科技有限公司",
  //      "company_website":null,
  //      "industry":"Technology",
  //      "num_employees":26,
  //      "annual_revenue":110700000,
  //      "name":"田立军",
  //      "title":"CTO",
  //      "recommended_email":null,
  //      "emails":[
          
  //      ],
  //      "phones":[
          
  //      ],
  //      "company_keyword":[
          
  //      ],
  //      "linkedin_url":"https://www.linkedin.com/in/立军-田-255aa4b5"
  //   },
  //   {
  //      "country":"China",
  //      "company_name":"北京智眸科技有限公司",
  //      "company_website":null,
  //      "industry":"Technology",
  //      "num_employees":26,
  //      "annual_revenue":110700000,
  //      "name":"鲁耀杰",
  //      "title":"CTO",
  //      "recommended_email":null,
  //      "emails":[
          
  //      ],
  //      "phones":[
          
  //      ],
  //      "company_keyword":[
          
  //      ],
  //      "linkedin_url":"https://www.linkedin.com/in/luyaojie"
  //   },
  //   {
  //      "country":"China",
  //      "company_name":"北京听鲜科技有限公司",
  //      "company_website":null,
  //      "industry":"Technology",
  //      "num_employees":26,
  //      "annual_revenue":110700000,
  //      "name":"邵励治",
  //      "title":"CEO | CTO",
  //      "recommended_email":null,
  //      "emails":[
          
  //      ],
  //      "phones":[
          
  //      ],
  //      "company_keyword":[
          
  //      ],
  //      "linkedin_url":"https://www.linkedin.com/in/邵励治"
  //   },
  //   {
  //      "country":"China",
  //      "company_name":"北京基智科技有限公司",
  //      "company_website":"http://www.idriverplus.com",
  //      "industry":"Technology",
  //      "num_employees":26,
  //      "annual_revenue":110700000,
  //      "name":"junfeng bai",
  //      "title":"CTO",
  //      "recommended_email":"junfengbai2011@gmail.com",
  //      "emails":[
  //         "junfengbai@idriverplus.com",
  //         "junfengb@idriverplus.com",
  //         "junfeng.bai@idriverplus.com",
  //         "jbai@idriverplus.com"
  //      ],
  //      "phones":[
          
  //      ],
  //      "company_keyword":[
          
  //      ],
  //      "linkedin_url":"https://www.linkedin.com/in/junfeng-bai-58623a3b"
  //   },
  //   {
  //      "country":"China",
  //      "company_name":"北京天域科技有限公司",
  //      "company_website":null,
  //      "industry":"Technology",
  //      "num_employees":26,
  //      "annual_revenue":110700000,
  //      "name":"唐茂生",
  //      "title":"CTO",
  //      "recommended_email":null,
  //      "emails":[
          
  //      ],
  //      "phones":[
          
  //      ],
  //      "company_keyword":[
          
  //      ],
  //      "linkedin_url":"https://www.linkedin.com/in/茂生-唐-b536b4a4"
  //   },
  //   {
  //      "country":"China",
  //      "company_name":"北京动维技术有限公司",
  //      "company_website":"http://dongweinet.com",
  //      "industry":"Technology",
  //      "num_employees":26,
  //      "annual_revenue":110700000,
  //      "name":"曲红波",
  //      "title":"cto",
  //      "recommended_email":null,
  //      "emails":[
  //         "qubo@dongweinet.com",
  //         "qub@dongweinet.com",
  //         "qu@dongweinet.com",
  //         "qu.bo@dongweinet.com",
  //         "qbo@dongweinet.com"
  //      ],
  //      "phones":[
          
  //      ],
  //      "company_keyword":[
          
  //      ],
  //      "linkedin_url":"https://www.linkedin.com/in/红波-曲-b9048a170"
  //   },
  //   {
  //      "country":"China",
  //      "company_name":"北京科技有限公司",
  //      "company_website":null,
  //      "industry":"Technology",
  //      "num_employees":26,
  //      "annual_revenue":110700000,
  //      "name":"Zhigang Li",
  //      "title":"CTO",
  //      "recommended_email":null,
  //      "emails":[
          
  //      ],
  //      "phones":[
          
  //      ],
  //      "company_keyword":[
          
  //      ],
  //      "linkedin_url":"https://www.linkedin.com/in/zhigang-li-ab26234a"
  //   },
  //   {
  //      "country":"China",
  //      "company_name":"北京智睿宝信息技术有限公司",
  //      "company_website":"http://zreport.cn",
  //      "industry":"Technology",
  //      "num_employees":26,
  //      "annual_revenue":110700000,
  //      "name":"张智",
  //      "title":"CTO",
  //      "recommended_email":null,
  //      "emails":[
  //         "zzhi@zreport.cn",
  //         "zhangzhi@zreport.cn",
  //         "zhangz@zreport.cn",
  //         "zhang@zreport.cn",
  //         "zhang.zhi@zreport.cn"
  //      ],
  //      "phones":[
          
  //      ],
  //      "company_keyword":[
          
  //      ],
  //      "linkedin_url":"https://www.linkedin.com/in/智-张-1028a01b2"
  //   },
  //   {
  //      "country":"China",
  //      "company_name":"北京智汇邦信息技术有限公司",
  //      "company_website":null,
  //      "industry":"Technology",
  //      "num_employees":26,
  //      "annual_revenue":110700000,
  //      "name":"李宇春",
  //      "title":"CTO",
  //      "recommended_email":null,
  //      "emails":[
          
  //      ],
  //      "phones":[
          
  //      ],
  //      "company_keyword":[
          
  //      ],
  //      "linkedin_url":"https://www.linkedin.com/in/宇春-李-4021a9aa"
  //   },
  //   {
  //      "country":"China",
  //      "company_name":"北京京乐网络技术有限公司",
  //      "company_website":null,
  //      "industry":"Technology",
  //      "num_employees":26,
  //      "annual_revenue":110700000,
  //      "name":"陆唯超",
  //      "title":"CTO",
  //      "recommended_email":null,
  //      "emails":[
          
  //      ],
  //      "phones":[
          
  //      ],
  //      "company_keyword":[
          
  //      ],
  //      "linkedin_url":"https://www.linkedin.com/in/唯超-陆-863421103"
  //   }]

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
  showProspects: boolean = false;
  companyId: any;

  async onSubmitAnswer(event: Event, textarea: HTMLTextAreaElement) {
    this.showProspects = false;
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
    user_id: localStorage.getItem("authToken")
  })
  .subscribe({
    next: (data) => {
      console.log(data)
      this.conversation = data.conversation;
      this.prospects = data.prospect_output;

      if (this.prospects != null) {
        try {
          this.companysrv.postCompany(data.standardized_json).subscribe({
            next: (company) => {
              console.log("Company: ", company);
              this.companyId = company.data.id;

              try {
                const prospectsWithCompany = data.prospect_output.results.map((pros: any) => ({
                  ...pros,
                  company_id: company.data.id
                }));

                this.prospectsService.uploadProspects(prospectsWithCompany).subscribe({
                  next: (propspects) => {
                    this.showProspects = true;
                    console.log("Prospects: ", propspects);
                  },
                  error: (uploadErr) => {
                    console.error("Error uploading prospects:", uploadErr);
                    this.toaster.error(uploadErr,"Error");
                    
                  }
                });
              } catch (mapErr) {
                console.error("Error mapping prospects with company ID:", mapErr);
              }
            },
            error: (companyErr) => {
              console.error("Error posting company:", companyErr);
              this.toaster.error(companyErr,"Error");
            }
          });
        } catch (error) {
          console.error("Unexpected error during company service call:", error);
          this.toaster.error("Failled to fetech conversation", "Error");
        }        

        setTimeout(() => {
          this.open();
        }, 0);
      }

      this.loading = false;
    },
    error: (error) => {
      console.error('Error fetching Conversation:', error);
      this.toaster.error(error,"Error");
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
