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
import { ProspectsService } from '../../services/prospects.service';
import { CompanyService } from '../../services/company.service';

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

  data = {"conversation":[{"role":"system","content":"You are an AI sales consultant. Your goal is to help businesses expand into new markets. Ask the user questions about their target regions, target industries, preferred company size, and preferred contacts. Once you have gathered all the necessary information, generate a JSON output with the following structure: {'target_regions': [], 'target_industries': [], 'preferred_company_size': '', 'preferred_contacts': []}. Ensure the following: - 'target_regions' is a list of regions (e.g., ['US', 'India']). - 'target_industries' is a list of industries (e.g., ['Technology', 'Healthcare']). - 'preferred_company_size' is a string that can be converted to integers (e.g., '500+', '100-1000'). - 'preferred_contacts' is a list of job titles or roles (e.g., ['CEO', 'CTO', 'Head of Engineering']). Keep the conversation natural and engaging.Always start your reply with I'm AI Sales,your sales consultant for every 1st message, not in every message rather where it suits"},{"role":"user","content":"hello"},{"role":"assistant","content":"I'm AI Sales, your sales consultant. Excited to help you expand your business into new markets! To get started, can you tell me which regions you're targeting for expansion? For example, are you looking at the US, Europe, Asia, or any specific countries?"},{"role":"user","content":"my company name is oakAI and its db is same as of company name. My company size is 500 people and we do business idiIT and AI industry,  Our target regions are NAM, Asia and target insutries are Tech and software. and my company weburl is www.oakai.com.Our TechStack is AI,SaaS,LLM. Indsurty keywords are also AI,SaaS,LLM.I'm looking to have conversation about our services with Head of Engineering/CEO/CTO level executirves. We offer mainly services like SaaS in industry we di business in"},{"role":"assistant","content":"Thank you for sharing the details about OakAI! Let me summarize the information and convert it into the structured format you're looking for. Here's the JSON output based on what you've provided:\n\n```json\n{\n  \"target_regions\": [\"NAM\", \"Asia\"],\n  \"target_industries\": [\"Technology\", \"Software\"],\n  \"preferred_company_size\": \"500+\",\n  \"preferred_contacts\": [\"Head of Engineering\", \"CEO\", \"CTO\"]\n}\n```\n\nLet me know if there's anything you'd like to refine or elaborate on! Would you like me to assist further with strategies for outreach or identifying key companies in these regions and industries?"},{"role":"user","content":"hello"},{"role":"assistant","content":"I'm AI Sales, your sales consultant. Excited to help you grow your business! Could you share more details about your goals? For example:\n\n- **Regions**: What areas or countries are you targeting for expansion? (e.g., North America, Asia)\n- **Industries**: Which industries are your focus? (e.g., Technology, Healthcare, Automotive)\n- **Company Size**: Are you targeting small businesses, mid-size firms, or enterprises? (e.g., 500+, 100-1000 employees)\n- **Contacts**: Who are the decision-makers you want to connect with? (e.g., CEOs, Heads of Engineering, CTOs)\n\nFeel free to share any specific goals or preferences!"},{"role":"user","content":"my company name is oakAI and its db is same as of company name. My company size is 500 people and we do business idiIT and AI industry,  Our target regions are NAM, Asia and target insutries are Tech and software. and my company weburl is www.oakai.com.Our TechStack is AI,SaaS,LLM. Indsurty keywords are also AI,SaaS,LLM.I'm looking to have conversation about our services with Head of Engineering/CEO/CTO level executirves. We offer mainly services like SaaS in industry we di business in"},{"role":"assistant","content":"Thank you for the details about OakAI! Based on the information you've shared, here's the structured JSON output that summarizes your expansion goals:\n\n```json\n{\n  \"target_regions\": [\"NAM\", \"Asia\"],\n  \"target_industries\": [\"Technology\", \"Software\"],\n  \"preferred_company_size\": \"500+\",\n  \"preferred_contacts\": [\"Head of Engineering\", \"CEO\", \"CTO\"]\n}\n```\n\nIt looks like you're well-positioned in the AI, SaaS, and LLM (Large Language Models) space, aiming to connect with decision-makers in the tech and software industries. Let me know if you'd like any specific recommendations or if you'd like help refining your outreach strategy!"}],"latest_json":{"target_regions":["NAM","Asia"],"target_industries":["Technology","Software"],"preferred_company_size":"500+","preferred_contacts":["Head of Engineering","CEO","CTO"]},"standardized_json":{"company_name":"oakAI","dba":"oakAI","products_services":["SaaS"],"buyer_industries":["IT","AI"],"web_url":"www.oakai.com","target_region":["NAM","Asia"],"target_industries":["Technology","Software"],"preferred_company_size":"500","preferred_contact_department":["Head of Engineering","CEO","CTO"],"preferred_industry_keywords":["AI","SaaS","LLM"],"tech_stack":["AI","SaaS","LLM"]},"prospect_output":{"message":"Results found.","results":[{"country":"China","company_name":"金叶天成（北京）科技有限公司","company_website":null,"industry":"Technology","num_employees":26,"annual_revenue":110700000,"name":"田立军","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/立军-田-255aa4b5"},{"country":"China","company_name":"北京智眸科技有限公司","company_website":null,"industry":"Technology","num_employees":26,"annual_revenue":110700000,"name":"鲁耀杰","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/luyaojie"},{"country":"China","company_name":"北京听鲜科技有限公司","company_website":null,"industry":"Technology","num_employees":26,"annual_revenue":110700000,"name":"邵励治","title":"CEO | CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/邵励治"},{"country":"China","company_name":"北京基智科技有限公司","company_website":"http://www.idriverplus.com","industry":"Technology","num_employees":26,"annual_revenue":110700000,"name":"junfeng bai","title":"CTO","recommended_email":"junfengbai2011@gmail.com","emails":["junfengbai@idriverplus.com","junfengb@idriverplus.com","junfeng.bai@idriverplus.com","jbai@idriverplus.com"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/junfeng-bai-58623a3b"},{"country":"China","company_name":"北京天域科技有限公司","company_website":null,"industry":"Technology","num_employees":26,"annual_revenue":110700000,"name":"唐茂生","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/茂生-唐-b536b4a4"},{"country":"China","company_name":"北京动维技术有限公司","company_website":"http://dongweinet.com","industry":"Technology","num_employees":26,"annual_revenue":110700000,"name":"曲红波","title":"cto","recommended_email":null,"emails":["qubo@dongweinet.com","qub@dongweinet.com","qu@dongweinet.com","qu.bo@dongweinet.com","qbo@dongweinet.com"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/红波-曲-b9048a170"},{"country":"China","company_name":"北京科技有限公司","company_website":null,"industry":"Technology","num_employees":26,"annual_revenue":110700000,"name":"Zhigang Li","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/zhigang-li-ab26234a"},{"country":"China","company_name":"北京智睿宝信息技术有限公司","company_website":"http://zreport.cn","industry":"Technology","num_employees":26,"annual_revenue":110700000,"name":"张智","title":"CTO","recommended_email":null,"emails":["zzhi@zreport.cn","zhangzhi@zreport.cn","zhangz@zreport.cn","zhang@zreport.cn","zhang.zhi@zreport.cn"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/智-张-1028a01b2"},{"country":"China","company_name":"北京智汇邦信息技术有限公司","company_website":null,"industry":"Technology","num_employees":26,"annual_revenue":110700000,"name":"李宇春","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/宇春-李-4021a9aa"},{"country":"China","company_name":"北京京乐网络技术有限公司","company_website":null,"industry":"Technology","num_employees":26,"annual_revenue":110700000,"name":"陆唯超","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/唯超-陆-863421103"},{"country":"Japan","company_name":"株式会社WACUL","company_website":"https://wacul.co.jp/","industry":"Technology","num_employees":32,"annual_revenue":6000000,"name":"Ryohei Obuchi","title":"CEO","recommended_email":"obuchi@wacul.co.jp","emails":["obuchi@wacul.co.jp","ryoheio@wacul.co.jp","ryohei_obuchi@wacul.co.jp","ryohei@wacul.co.jp","ryohei.obuchi@wacul.co.jp","robuchi@wacul.co.jp","obuchir@wacul.co.jp"],"phones":[],"company_keyword":["digital marketing","technology solutions","small business it","digital transformation","business technology","it consulting","saas solutions","marketing automation","data analytics","cloud computing","web development","software solutions","e commerce solutions","crm software","project management","business intelligence","it infrastructure","cybersecurity","mobile solutions","big data"],"linkedin_url":"https://www.linkedin.com/in/ryoheiobuchi"},{"country":"Japan","company_name":"WhiteBear株式会社","company_website":null,"industry":"Technology","num_employees":32,"annual_revenue":6000000,"name":"Natsuhiko Yuasa","title":"CEO CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["digital marketing","technology solutions","small business it","digital transformation","business technology","it consulting","saas solutions","marketing automation","data analytics","cloud computing","web development","software solutions","e commerce solutions","crm software","project management","business intelligence","it infrastructure","cybersecurity","mobile solutions","big data"],"linkedin_url":"https://www.linkedin.com/in/natsuhiko-yuasa-3478b5112"},{"country":"Japan","company_name":"株式会社","company_website":null,"industry":"Technology","num_employees":32,"annual_revenue":6000000,"name":"塙洋兵","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["digital marketing","technology solutions","small business it","digital transformation","business technology","it consulting","saas solutions","marketing automation","data analytics","cloud computing","web development","software solutions","e commerce solutions","crm software","project management","business intelligence","it infrastructure","cybersecurity","mobile solutions","big data"],"linkedin_url":"https://www.linkedin.com/in/洋兵-塙-367ab21b9"},{"country":"Japan","company_name":"freee 株式会社","company_website":"https://www.freee.co.jp/","industry":"Technology","num_employees":32,"annual_revenue":6000000,"name":"湧気 高山","title":"Head of Engineering","recommended_email":null,"emails":["yshan@freee.co.jp","yong.shan@freee.co.jp","yongs@freee.co.jp","yong-shan@freee.co.jp"],"phones":[],"company_keyword":["digital marketing","technology solutions","small business it","digital transformation","business technology","it consulting","saas solutions","marketing automation","data analytics","cloud computing","web development","software solutions","e commerce solutions","crm software","project management","business intelligence","it infrastructure","cybersecurity","mobile solutions","big data"],"linkedin_url":"https://www.linkedin.com/in/湧気-高山-2741bb207"},{"country":"Japan","company_name":"株式会社ARLUE","company_website":null,"industry":"Technology","num_employees":32,"annual_revenue":6000000,"name":"Genki Hagiwara","title":"CEO and CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["digital marketing","technology solutions","small business it","digital transformation","business technology","it consulting","saas solutions","marketing automation","data analytics","cloud computing","web development","software solutions","e commerce solutions","crm software","project management","business intelligence","it infrastructure","cybersecurity","mobile solutions","big data"],"linkedin_url":"https://www.linkedin.com/in/genki-hagiwara-2a61a2162"},{"country":"Japan","company_name":"ソーシャルマーケティング株式会社","company_website":null,"industry":"Technology","num_employees":32,"annual_revenue":6000000,"name":"Kazuaki Aihara","title":"CEO and CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["digital marketing","technology solutions","small business it","digital transformation","business technology","it consulting","saas solutions","marketing automation","data analytics","cloud computing","web development","software solutions","e commerce solutions","crm software","project management","business intelligence","it infrastructure","cybersecurity","mobile solutions","big data"],"linkedin_url":"https://www.linkedin.com/in/kazuaki-aihara-592185191"},{"country":"Japan","company_name":"株式会社エンジトライブ","company_website":null,"industry":"Technology","num_employees":32,"annual_revenue":6000000,"name":"Akiyuki Kaneda","title":"CEO and CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["digital marketing","technology solutions","small business it","digital transformation","business technology","it consulting","saas solutions","marketing automation","data analytics","cloud computing","web development","software solutions","e commerce solutions","crm software","project management","business intelligence","it infrastructure","cybersecurity","mobile solutions","big data"],"linkedin_url":"https://www.linkedin.com/in/akiyuki-kaneda-739660212"},{"country":"Japan","company_name":"株式会社セブンズアーク","company_website":null,"industry":"Technology","num_employees":32,"annual_revenue":6000000,"name":"Masaki Kondo","title":"CEO and CTO","recommended_email":"aiki_conkichi@hotmail.com","emails":[],"phones":[],"company_keyword":["digital marketing","technology solutions","small business it","digital transformation","business technology","it consulting","saas solutions","marketing automation","data analytics","cloud computing","web development","software solutions","e commerce solutions","crm software","project management","business intelligence","it infrastructure","cybersecurity","mobile solutions","big data"],"linkedin_url":"https://www.linkedin.com/in/masaki-kondo-10070344"},{"country":"Japan","company_name":"株式会社Shells","company_website":null,"industry":"Technology","num_employees":32,"annual_revenue":6000000,"name":"Junya Kawakami","title":"CEO and CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["digital marketing","technology solutions","small business it","digital transformation","business technology","it consulting","saas solutions","marketing automation","data analytics","cloud computing","web development","software solutions","e commerce solutions","crm software","project management","business intelligence","it infrastructure","cybersecurity","mobile solutions","big data"],"linkedin_url":"https://www.linkedin.com/in/junya-kawakami-jk"},{"country":"Japan","company_name":"METRICA株式会社","company_website":null,"industry":"Technology","num_employees":32,"annual_revenue":6000000,"name":"Kansuke Habano","title":"CEO and CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["digital marketing","technology solutions","small business it","digital transformation","business technology","it consulting","saas solutions","marketing automation","data analytics","cloud computing","web development","software solutions","e commerce solutions","crm software","project management","business intelligence","it infrastructure","cybersecurity","mobile solutions","big data"],"linkedin_url":"https://www.linkedin.com/in/kansuke-habano-028874135"},{"country":"Israel","company_name":"CorNeat Vision","company_website":"http://www.corneat.com","industry":"Technology","num_employees":51,"annual_revenue":7000000,"name":"Ori Amsellem","title":"Head of Engineering","recommended_email":"ori@corneat.com","emails":["ori@corneat.com","oriamsellem@corneat.com","oria@corneat.com","ori.amsellem@corneat.com","oamsellem@corneat.com","amsellem@corneat.com"],"phones":[],"company_keyword":["manufacturing automation","machine vision","vision inspection","industrial automation","embedded systems","automation solutions","vision systems","robotic vision","image processing","computer vision","motion control","process automation","quality control","smart automation","industrial sensors","automation technology","factory automation","industrial robotics","control systems"],"linkedin_url":"https://www.linkedin.com/in/ori-amsellem-454a2a205"},{"country":"India","company_name":"Avo Automation","company_website":"http://www.avoautomation.ai","industry":"Technology","num_employees":51,"annual_revenue":7000000,"name":"Shankaranarayana Adiga","title":"CTO and Head of Engineering","recommended_email":null,"emails":["shankaranarayanaadiga@avoautomation.ai","shankaranarayanaa@avoautomation.ai","shankaranarayana@avoautomation.ai","shankaranarayana.adiga@avoautomation.ai","sadiga@avoautomation.ai","adiga@avoautomation.ai"],"phones":[],"company_keyword":["manufacturing automation","machine vision","vision inspection","industrial automation","embedded systems","automation solutions","vision systems","robotic vision","image processing","computer vision","motion control","process automation","quality control","smart automation","industrial sensors","automation technology","factory automation","industrial robotics","control systems"],"linkedin_url":"https://www.linkedin.com/in/snadiga"},{"country":"Lebanon","company_name":"Smart Vision","company_website":"http://www.smartv.ae","industry":"Technology","num_employees":51,"annual_revenue":7000000,"name":"Dima Chdid","title":"CTO","recommended_email":null,"emails":["dimac@smartv.ae","dima.chdid@smartv.ae","dima.c@smartv.ae","dchdid@smartv.ae"],"phones":[],"company_keyword":["manufacturing automation","machine vision","vision inspection","industrial automation","embedded systems","automation solutions","vision systems","robotic vision","image processing","computer vision","motion control","process automation","quality control","smart automation","industrial sensors","automation technology","factory automation","industrial robotics","control systems"],"linkedin_url":"https://www.linkedin.com/in/dima-chdid-2375971a2"},{"country":"Uzbekistan","company_name":"Cradle Vision Tech","company_website":"https://cradle.uz","industry":"Technology","num_employees":51,"annual_revenue":7000000,"name":"Kamoliddin Soliev","title":"CTO","recommended_email":null,"emails":["ksoliev@cradle.uz","kamoliddinsoliev@cradle.uz","kamoliddin@cradle.uz","kamoliddin.soliev@cradle.uz"],"phones":[],"company_keyword":["manufacturing automation","machine vision","vision inspection","industrial automation","embedded systems","automation solutions","vision systems","robotic vision","image processing","computer vision","motion control","process automation","quality control","smart automation","industrial sensors","automation technology","factory automation","industrial robotics","control systems"],"linkedin_url":"https://www.linkedin.com/in/kamoliddin-soliev-5666b411a"},{"country":"Lebanon","company_name":"Box & Automation Solutions","company_website":"http://www.treasuryxpress.com","industry":"Technology","num_employees":51,"annual_revenue":7000000,"name":"Assaad Chalhoub","title":"CTO And Managing Partner","recommended_email":null,"emails":["assaad.chalhoub@treasuryxpress.com","assaad@treasuryxpress.com","achalhoub@treasuryxpress.com"],"phones":[],"company_keyword":["manufacturing automation","machine vision","vision inspection","industrial automation","embedded systems","automation solutions","vision systems","robotic vision","image processing","computer vision","motion control","process automation","quality control","smart automation","industrial sensors","automation technology","factory automation","industrial robotics","control systems"],"linkedin_url":"https://www.linkedin.com/in/assaad-chalhoub-pmpâ®-20081314"},{"country":"Israel","company_name":"Asio Vision","company_website":null,"industry":"Technology","num_employees":51,"annual_revenue":7000000,"name":"Motty Dotan","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["manufacturing automation","machine vision","vision inspection","industrial automation","embedded systems","automation solutions","vision systems","robotic vision","image processing","computer vision","motion control","process automation","quality control","smart automation","industrial sensors","automation technology","factory automation","industrial robotics","control systems"],"linkedin_url":"https://www.linkedin.com/in/motty-dotan-20ab0b11"},{"country":"Jordan","company_name":"Smart Vision Group","company_website":"https://smartvisionjo.com/","industry":"Technology","num_employees":51,"annual_revenue":7000000,"name":"Ahmed kharoub","title":"Head Of Engineering Department","recommended_email":"ahmed.kharoub@smartvisionjo.com","emails":["ahmed.kharoub@smartvisionjo.com","akharoub@smartvisionjo.com","ahmedkharoub@smartvisionjo.com","ahmedk@smartvisionjo.com"],"phones":[],"company_keyword":["manufacturing automation","machine vision","vision inspection","industrial automation","embedded systems","automation solutions","vision systems","robotic vision","image processing","computer vision","motion control","process automation","quality control","smart automation","industrial sensors","automation technology","factory automation","industrial robotics","control systems"],"linkedin_url":"https://www.linkedin.com/in/ahmed-kharoub-51678053"},{"country":"Tajikistan","company_name":"Nova Vision","company_website":"http://nova.tj/","industry":"Technology","num_employees":51,"annual_revenue":7000000,"name":"Ruslan Abdurashitov","title":"CEO","recommended_email":null,"emails":["rabdurashitov@beeline.tj","ruslan@nova.tj","ruslan.abdurashitov@nova.tj","rabdurashitov@nova.tj","ruslanabdurashitov@nova.tj","ruslana@nova.tj","abdurashitov@nova.tj"],"phones":[],"company_keyword":["manufacturing automation","machine vision","vision inspection","industrial automation","embedded systems","automation solutions","vision systems","robotic vision","image processing","computer vision","motion control","process automation","quality control","smart automation","industrial sensors","automation technology","factory automation","industrial robotics","control systems"],"linkedin_url":"https://www.linkedin.com/in/ruslan-abdurashitov-840039b3"},{"country":"Israel","company_name":"Energy Vision","company_website":"http://www.energy-vision.org","industry":"Technology","num_employees":51,"annual_revenue":7000000,"name":"Moshe Horowitz","title":"CTO","recommended_email":null,"emails":["moshehorowitz@energy-vision.org","mosheh@energy-vision.org","moshe@energy-vision.org","moshe.horowitz@energy-vision.org","mhorowitz@energy-vision.org","horowitz@energy-vision.org","moshe@movicel.net"],"phones":[],"company_keyword":["manufacturing automation","machine vision","vision inspection","industrial automation","embedded systems","automation solutions","vision systems","robotic vision","image processing","computer vision","motion control","process automation","quality control","smart automation","industrial sensors","automation technology","factory automation","industrial robotics","control systems"],"linkedin_url":"https://www.linkedin.com/in/moshe-horowitz-a4a3541"},{"country":"Japan","company_name":"Bi2-Vision","company_website":null,"industry":"Technology","num_employees":51,"annual_revenue":7000000,"name":"Xiaolin Zhang","title":"CTO","recommended_email":null,"emails":["zhang@pi.titech.ac.jp"],"phones":[],"company_keyword":["manufacturing automation","machine vision","vision inspection","industrial automation","embedded systems","automation solutions","vision systems","robotic vision","image processing","computer vision","motion control","process automation","quality control","smart automation","industrial sensors","automation technology","factory automation","industrial robotics","control systems"],"linkedin_url":"https://www.linkedin.com/in/xiaolin-zhang-3591582a"},{"country":"Israel","company_name":"BLITZ MOTORS","company_website":"http://www.blitzmotors.com/","industry":"Technology","num_employees":13,"annual_revenue":5200000,"name":"Guy Cohen","title":"CTO","recommended_email":"hilaguyc@gmail.com","emails":["guy@blitzmotors.com","gcohen@blitzmotors.com"],"phones":[],"company_keyword":["software development","it solutions","web development","website design","software solutions","mobile app development","web applications","it services","ios development","android development","custom software","application development","cms development","mobile apps","responsive design","user interface design","e commerce solutions","database management","website maintenance","cloud computing"],"linkedin_url":"https://www.linkedin.com/in/guy-cohen-b994347"},{"country":"Republic of Korea","company_name":"Infotech","company_website":null,"industry":"Technology","num_employees":13,"annual_revenue":5200000,"name":"Choi Sejong","title":"CTO","recommended_email":null,"emails":["sejong@infotechsolutions.com","csejong@infotechsolutions.com","choisejong@infotechsolutions.com","chois@infotechsolutions.com","choi@infotechsolutions.com","choi.sejong@infotechsolutions.com","sjchoi@odis.co.kr"],"phones":[],"company_keyword":["software development","it solutions","web development","website design","software solutions","mobile app development","web applications","it services","ios development","android development","custom software","application development","cms development","mobile apps","responsive design","user interface design","e commerce solutions","database management","website maintenance","cloud computing"],"linkedin_url":"https://www.linkedin.com/in/choi-sejong-8903a521"},{"country":"Viet Nam","company_name":"Blitz Asia","company_website":null,"industry":"Technology","num_employees":13,"annual_revenue":5200000,"name":"Huong Huynh","title":"CEO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["software development","it solutions","web development","website design","software solutions","mobile app development","web applications","it services","ios development","android development","custom software","application development","cms development","mobile apps","responsive design","user interface design","e commerce solutions","database management","website maintenance","cloud computing"],"linkedin_url":"https://www.linkedin.com/in/huong-tra-huynh-b9114455"},{"country":"Iran","company_name":"Blito","company_website":"http://www.blito.ir","industry":"Technology","num_employees":13,"annual_revenue":5200000,"name":"Behnood Foroudi","title":"CEO","recommended_email":null,"emails":["foroudi@blito.ir","bforoudi@blito.ir","behnoodforoudi@blito.ir","behnoodf@blito.ir","behnood.foroudi@blito.ir"],"phones":[],"company_keyword":["software development","it solutions","web development","website design","software solutions","mobile app development","web applications","it services","ios development","android development","custom software","application development","cms development","mobile apps","responsive design","user interface design","e commerce solutions","database management","website maintenance","cloud computing"],"linkedin_url":"https://www.linkedin.com/in/behnood-foroudi-28ba62131"},{"country":"Lao People's Democratic Republic","company_name":"INFOTECH Co.,LTD","company_website":null,"industry":"Technology","num_employees":13,"annual_revenue":5200000,"name":"Khone Saysu","title":"CEO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["software development","it solutions","web development","website design","software solutions","mobile app development","web applications","it services","ios development","android development","custom software","application development","cms development","mobile apps","responsive design","user interface design","e commerce solutions","database management","website maintenance","cloud computing"],"linkedin_url":"https://www.linkedin.com/in/khone-saysu-58958777"},{"country":"Lebanon","company_name":"Blitz Rebar","company_website":null,"industry":"Technology","num_employees":13,"annual_revenue":5200000,"name":"Karl Antoun","title":"Founder and CEO","recommended_email":"karl.antoun@aabcoonline.com","emails":["karl.antoun@aabcoonline.com","karlantoun@aabcoonline.com","karl@aabcoonline.com","kantoun@aabcoonline.com"],"phones":[],"company_keyword":["software development","it solutions","web development","website design","software solutions","mobile app development","web applications","it services","ios development","android development","custom software","application development","cms development","mobile apps","responsive design","user interface design","e commerce solutions","database management","website maintenance","cloud computing"],"linkedin_url":"https://www.linkedin.com/in/karl-antoun-509695167"},{"country":"India","company_name":"Blitz (erstwhile Grow Simplee)","company_website":"https://www.blitznow.in/","industry":"Technology","num_employees":13,"annual_revenue":5200000,"name":"Saurabh Sinha","title":"Head of Engineering","recommended_email":"saurabh@blitznow.in","emails":["saurabh@blitznow.in","sinha@growsimplee.com","ssinha@blitznow.in","saurabhsinha@blitznow.in","saurabh.sinha@blitznow.in"],"phones":[],"company_keyword":["software development","it solutions","web development","website design","software solutions","mobile app development","web applications","it services","ios development","android development","custom software","application development","cms development","mobile apps","responsive design","user interface design","e commerce solutions","database management","website maintenance","cloud computing"],"linkedin_url":"https://www.linkedin.com/in/saurabh-sinha-17aab4107"},{"country":"Pakistan","company_name":"Blitz DDB","company_website":null,"industry":"Technology","num_employees":13,"annual_revenue":5200000,"name":"Ahsen Idris","title":"CEO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["software development","it solutions","web development","website design","software solutions","mobile app development","web applications","it services","ios development","android development","custom software","application development","cms development","mobile apps","responsive design","user interface design","e commerce solutions","database management","website maintenance","cloud computing"],"linkedin_url":"https://www.linkedin.com/in/ahsen-idris-09679118"},{"country":"Armenia","company_name":"Blitz Technologies LLC","company_website":null,"industry":"Technology","num_employees":13,"annual_revenue":5200000,"name":"Konstantin Stein","title":"CEO and Founder","recommended_email":null,"emails":[],"phones":[],"company_keyword":["software development","it solutions","web development","website design","software solutions","mobile app development","web applications","it services","ios development","android development","custom software","application development","cms development","mobile apps","responsive design","user interface design","e commerce solutions","database management","website maintenance","cloud computing"],"linkedin_url":"https://www.linkedin.com/in/konstantinstein"},{"country":"Indonesia","company_name":"CGV* blitz","company_website":"http://www.cgv.id","industry":"Technology","num_employees":13,"annual_revenue":5200000,"name":"Limjong Kil","title":"CEO","recommended_email":null,"emails":["lkil@cgvblitz.com","limjongkil@cgvblitz.com","limjongk@cgvblitz.com","limjong_kil@cgvblitz.com","limjong@cgvblitz.com","limjong.kil@cgvblitz.com","kill@cgvblitz.com","kil@cgvblitz.com"],"phones":[],"company_keyword":["software development","it solutions","web development","website design","software solutions","mobile app development","web applications","it services","ios development","android development","custom software","application development","cms development","mobile apps","responsive design","user interface design","e commerce solutions","database management","website maintenance","cloud computing"],"linkedin_url":"https://www.linkedin.com/in/limjong-kil-73a192122"},{"country":"Republic of Korea","company_name":"hunet","company_website":"https://company.hunet.co.kr/Main","industry":"Technology","num_employees":2,"annual_revenue":2400000,"name":"Sungjoe Cho","title":"CTO","recommended_email":null,"emails":["sungjoe.cho@hunet.co.kr","sungjoe@hunet.co.kr","scho@hunet.co.kr","sungjoecho@hunet.co.kr","sungjoec@hunet.co.kr","sungjoe_cho@hunet.co.kr","cho@hunet.co.kr","chos@hunet.co.kr"],"phones":[],"company_keyword":["how-to guides","tips and tricks","tutorials","social media tips","blogging tips","tech tutorials","online tutorials","online resources","digital tips","tech news","web tutorials","tech tricks","digital content","free downloads","wallpaper downloads","downloadable content"],"linkedin_url":"https://www.linkedin.com/in/sungjoe-cho-80774469"},{"country":"Israel","company_name":"On Sabbatical","company_website":"http://www.blankwebpage.com/","industry":"Technology","num_employees":2,"annual_revenue":2400000,"name":"Alex Bell","title":"CTO","recommended_email":null,"emails":["alexbell@blankwebpage.com","alexb@blankwebpage.com","alex.bell@blankwebpage.com","abell@blankwebpage.com"],"phones":[],"company_keyword":["how-to guides","tips and tricks","tutorials","social media tips","blogging tips","tech tutorials","online tutorials","online resources","digital tips","tech news","web tutorials","tech tricks","digital content","free downloads","wallpaper downloads","downloadable content"],"linkedin_url":"https://www.linkedin.com/in/alex-bell-8775a25b"},{"country":"Israel","company_name":"LOG-ON","company_website":"http://log-on.com","industry":"Technology","num_employees":2,"annual_revenue":2400000,"name":"Dory Breiman","title":"CTO","recommended_email":"dory.breiman@gmail.com","emails":["dorybreiman@log-on.com","doryb@log-on.com","dory@log-on.com","dory.breiman@log-on.com","dbreiman@log-on.com","breimand@log-on.com","breiman@log-on.com","dory.b@mosteam.com"],"phones":[],"company_keyword":["how-to guides","tips and tricks","tutorials","social media tips","blogging tips","tech tutorials","online tutorials","online resources","digital tips","tech news","web tutorials","tech tricks","digital content","free downloads","wallpaper downloads","downloadable content"],"linkedin_url":"https://www.linkedin.com/in/dory-breiman-4981b51"},{"country":"Azerbaijan","company_name":"Secret Academy","company_website":null,"industry":"Technology","num_employees":2,"annual_revenue":2400000,"name":"Nihad Taghizade","title":"CEO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["how-to guides","tips and tricks","tutorials","social media tips","blogging tips","tech tutorials","online tutorials","online resources","digital tips","tech news","web tutorials","tech tricks","digital content","free downloads","wallpaper downloads","downloadable content"],"linkedin_url":"https://www.linkedin.com/in/nihadtaghizade"},{"country":"Afghanistan","company_name":"Hut & Co. Registeraccountants","company_website":"http://www.hutco.nl","industry":"Technology","num_employees":2,"annual_revenue":2400000,"name":"Luiz A","title":"cto","recommended_email":null,"emails":["luiza@hutco.nl","luiz@hutco.nl","luiz.a@hutco.nl"],"phones":[],"company_keyword":["how-to guides","tips and tricks","tutorials","social media tips","blogging tips","tech tutorials","online tutorials","online resources","digital tips","tech news","web tutorials","tech tricks","digital content","free downloads","wallpaper downloads","downloadable content"],"linkedin_url":"https://www.linkedin.com/in/luiz-m-a-00531115"},{"country":"Taiwan, Province of China","company_name":"Hung Bros","company_website":null,"industry":"Technology","num_employees":2,"annual_revenue":2400000,"name":"洪宇樑","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["how-to guides","tips and tricks","tutorials","social media tips","blogging tips","tech tutorials","online tutorials","online resources","digital tips","tech news","web tutorials","tech tricks","digital content","free downloads","wallpaper downloads","downloadable content"],"linkedin_url":"https://www.linkedin.com/in/宇樑-洪-627426167"},{"country":"Philippines","company_name":"secret","company_website":null,"industry":"Technology","num_employees":2,"annual_revenue":2400000,"name":"Emmanuel Garon","title":"CEO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["how-to guides","tips and tricks","tutorials","social media tips","blogging tips","tech tutorials","online tutorials","online resources","digital tips","tech news","web tutorials","tech tricks","digital content","free downloads","wallpaper downloads","downloadable content"],"linkedin_url":"https://www.linkedin.com/in/emmanuel-garon-18ab2a9"},{"country":"Philippines","company_name":"Secret","company_website":"http://www.iiglobal.net/horizontaleconomist","industry":"Technology","num_employees":2,"annual_revenue":2400000,"name":"Mary Abuel","title":"ceo","recommended_email":null,"emails":["maryabuel@iiglobal.net","marya@iiglobal.net","mary_abuel@iiglobal.net","mary@iiglobal.net","mary.abuel@iiglobal.net","mabuel@iiglobal.net","abuelm@iiglobal.net","abuel@iiglobal.net"],"phones":[],"company_keyword":["how-to guides","tips and tricks","tutorials","social media tips","blogging tips","tech tutorials","online tutorials","online resources","digital tips","tech news","web tutorials","tech tricks","digital content","free downloads","wallpaper downloads","downloadable content"],"linkedin_url":"https://www.linkedin.com/in/mary-ann-abuel-a5690425"},{"country":"Philippines","company_name":"Secret","company_website":null,"industry":"Technology","num_employees":2,"annual_revenue":2400000,"name":"Aj Brag","title":"CEO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["how-to guides","tips and tricks","tutorials","social media tips","blogging tips","tech tutorials","online tutorials","online resources","digital tips","tech news","web tutorials","tech tricks","digital content","free downloads","wallpaper downloads","downloadable content"],"linkedin_url":"https://www.linkedin.com/in/aj-brag-b2b388288"},{"country":"Republic of Korea","company_name":"ON-Look Korea","company_website":null,"industry":"Technology","num_employees":2,"annual_revenue":2400000,"name":"Minhyun Cho","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["how-to guides","tips and tricks","tutorials","social media tips","blogging tips","tech tutorials","online tutorials","online resources","digital tips","tech news","web tutorials","tech tricks","digital content","free downloads","wallpaper downloads","downloadable content"],"linkedin_url":"https://www.linkedin.com/in/minhyuncho"},{"country":"Singapore","company_name":"Rapsodo Sports (Rapsodo, Inc.)","company_website":"https://rapsodo.com","industry":"Technology","num_employees":1,"annual_revenue":1000000,"name":"Yasar Savak","title":"Global Head of Engineering","recommended_email":"buraksavak@gmail.com","emails":["ysavak@rapsodo.com","yasarsavak@rapsodo.com","yasars@rapsodo.com","yasar_savak@rapsodo.com","yasar@rapsodo.com","yasar.savak@rapsodo.com","savaky@rapsodo.com","savak@rapsodo.com","burak@savak.org"],"phones":["510-206-9741","561-801-6985","561-883-9693"],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/buraksavak"},{"country":"Sri Lanka","company_name":"DreamStart Labs","company_website":"http://www.dreamstartlabs.com","industry":"Technology","num_employees":1,"annual_revenue":1000000,"name":"Premuditha Perera","title":"Head of Engineering","recommended_email":"premuditha@calcey.com","emails":["premuditha@calcey.com","premuditha@dreamstartlabs.com","premudithaperera@dreamstartlabs.com","premudithap@dreamstartlabs.com","premuditha.perera@dreamstartlabs.com","pperera@dreamstartlabs.com","premudithaperera@calcey.com","premuditha.perera@calcey.com","premuditha.p@calcey.com","premudithap@calcey.com","premuditha_perera@calcey.com"],"phones":["+94 77 750 6069","+94 77 755 5081","+94 77 229 3742","+94 77 377 1813","+94 112 517 432","+94 112 701 106"],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/premuditha"},{"country":"Thailand","company_name":"Covest Labs","company_website":"https://www.covest.finance/","industry":"Technology","num_employees":1,"annual_revenue":1000000,"name":"Nawapan Arampibulkit","title":"Head of Engineering","recommended_email":null,"emails":["nawapan.a@covest.finance","nawapan@covest.finance","nawapan.arampibulkit@covest.finance","narampibulkit@covest.finance"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/nawapan-arampibulkit-10b312171"},{"country":"Republic of Korea","company_name":"Skelter Labs","company_website":"http://www.skelterlabs.com","industry":"Technology","num_employees":1,"annual_revenue":1000000,"name":"Jonghoon Seo","title":"Head of Engineering","recommended_email":"jonghoonseo@skelterlabs.com","emails":["jonghoonseo@skelterlabs.com","jonghoon.seo@skelterlabs.com","jseo@skelterlabs.com","jonghoons@skelterlabs.com","jonghoon@skelterlabs.com"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/jonghoonseo"},{"country":"Viet Nam","company_name":"AnyAxis Labs","company_website":"https://www.anyax.is","industry":"Technology","num_employees":1,"annual_revenue":1000000,"name":"Duc Nguyen","title":"Head of Engineering","recommended_email":null,"emails":["ducnguyen@anyax.is","ducn@anyax.is","duc@anyax.is","duc.nguyen@anyax.is","dnguyen@anyax.is","duc.nguyen@vector.edu.vn","dnguyen@vector.edu.vn"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/ducanh-99"},{"country":"Viet Nam","company_name":"Mirai Labs","company_website":"https://mirailabs.co","industry":"Technology","num_employees":1,"annual_revenue":1000000,"name":"Nhan Le","title":"Head of Engineering","recommended_email":null,"emails":["nhan@mirailabs.co","nhan.le@mirailabs.co"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/nhan-d-le-b5362960"},{"country":"Viet Nam","company_name":"Console Labs","company_website":"https://console.so/","industry":"Technology","num_employees":1,"annual_revenue":1000000,"name":"Huy Nguyen","title":"Head of Engineering","recommended_email":null,"emails":["huynguyen@console.so","huyn@console.so","huy@console.so","huy.nguyen@console.so","hnguyen@console.so","huy.nguyen@dwarves.foundation","hnguyen@dwarves.foundation"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/huynguyenh"},{"country":"Japan","company_name":"Terraform Labs","company_website":"http://terra.money","industry":"Technology","num_employees":1,"annual_revenue":1000000,"name":"Michael Brown","title":"Head Of Engineering","recommended_email":null,"emails":["michaelbrown@terra.money","michaelb@terra.money","michael@terra.money","michael.brown@terra.money","mbrown@terra.money","brown@terra.money"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/michael-brown-547996223"},{"country":"Viet Nam","company_name":"Mirai Labs","company_website":"https://mirailabs.co","industry":"Technology","num_employees":1,"annual_revenue":1000000,"name":"Sơn Xuân","title":"Head of Engineering","recommended_email":"sonpxvn@gmail.com","emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/store8x"},{"country":"Republic of Korea","company_name":"Purevalley Labs","company_website":null,"industry":"Technology","num_employees":1,"annual_revenue":1000000,"name":"Ilo Yoon","title":"CEO and CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/iloyoon"},{"country":"Japan","company_name":"株式会社Gunosy","company_website":"https://gunosy.co.jp/","industry":"Technology","num_employees":0,"annual_revenue":null,"name":"間庭 裕喜","title":"CEO室長","recommended_email":null,"emails":["jxi@gunosy.co.jp","jianxi@gunosy.co.jp","jian@gunosy.co.jp","jian.xi@gunosy.co.jp"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/裕喜-間庭-8084aa185"},{"country":"Japan","company_name":"株式会社Gunosy","company_website":"https://gunosy.co.jp/","industry":"Technology","num_employees":0,"annual_revenue":null,"name":"岡村高之","title":"CEO室室長","recommended_email":null,"emails":["gzhi@gunosy.co.jp","gangzhi@gunosy.co.jp","gang@gunosy.co.jp","gang.zhi@gunosy.co.jp"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/高之-岡村-23660441"},{"country":"India","company_name":"GoCosy","company_website":"https://gocosy.com","industry":"Technology","num_employees":0,"annual_revenue":null,"name":"GoCosy GoCosy","title":"CTO","recommended_email":null,"emails":["gocosygocosy@gocosy.com","gocosy@gocosy.com","gocosy.gocosy@gocosy.com","ggocosy@gocosy.com"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/gocosy-gocosy-43a0b9135"},{"country":"Iran","company_name":"Gunash Sati","company_website":null,"industry":"Technology","num_employees":0,"annual_revenue":null,"name":"Behnaz Naghshineh","title":"CEO","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/behnaz-naghshineh-247bb577"},{"country":"Japan","company_name":"GUNCY'S Inc","company_website":null,"industry":"Technology","num_employees":0,"annual_revenue":null,"name":"Tetsuya Nozawa","title":"CEO","recommended_email":"tetchinnoz@yahoo.co.jp","emails":[],"phones":["81368557821"],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/tetsuya-nozawa-61273011"},{"country":"Turkey","company_name":"Gürsoy holding","company_website":null,"industry":"Technology","num_employees":0,"annual_revenue":null,"name":"Metin Gürsoy","title":"Ceo","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/metin-gürsoy-3a30a4142"},{"country":"Singapore","company_name":"Lunos","company_website":"http://www.focuscoregroup.com","industry":"Technology","num_employees":0,"annual_revenue":null,"name":"Shafiq Samsudin","title":"CEO and Founder","recommended_email":"shafiq.samsudin@focuscoregroup.com","emails":["shafiq.samsudin@focuscoregroup.com","shafiq@focuscoregroup.com","ssamsudin@focuscoregroup.com","shafiqs@focuscoregroup.com","samsudin@focuscoregroup.com"],"phones":["+65 9008 6225","+65 6513 9777","+65 6824 8267","+65 6631 2766"],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/shafiq-samsudin"},{"country":"Pakistan","company_name":"Freude Suber guness","company_website":"https://www.facebook.com/FreudeSubergenuss/","industry":"Technology","num_employees":0,"annual_revenue":null,"name":"Zaheer Sardar","title":"CEO","recommended_email":"hassantraders140@gmail.com","emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/zaheer-sardar-1890ab32"},{"country":"Turkey","company_name":"GÜNEŞ TEKNİK","company_website":null,"industry":"Technology","num_employees":0,"annual_revenue":null,"name":"Burak Bagrıyanık","title":"CEO","recommended_email":null,"emails":[],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/burak-bagrıyanık-57b2a9ba"},{"country":"Turkey","company_name":"Güney Enerji","company_website":"http://guneyenerji.com","industry":"Technology","num_employees":0,"annual_revenue":null,"name":"Çağdaş Karaca","title":"CEO","recommended_email":null,"emails":["ckaraca@guneyenerji.com","cagdaskaraca@guneyenerji.com","cagdas@guneyenerji.com","cagdas.karaca@guneyenerji.com"],"phones":[],"company_keyword":[],"linkedin_url":"https://www.linkedin.com/in/çağdaş-karaca-2b8a3551"},{"country":"China","company_name":"太平洋","company_website":null,"industry":"Technology","num_employees":2,"annual_revenue":null,"name":"吴教伟","title":"ceo","recommended_email":null,"emails":[],"phones":[],"company_keyword":["shipping","logistics","ports","maritime","freight","transportation","supply chain","global trade","ocean freight","cargo","shipping lines","intermodal","forwarding","distribution","warehousing","stevedoring","terminal operations"],"linkedin_url":"https://www.linkedin.com/in/教伟-吴-655481ab"},{"country":"China","company_name":"远洋地产有限公司","company_website":null,"industry":"Technology","num_employees":2,"annual_revenue":null,"name":"金灵伟","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["shipping","logistics","ports","maritime","freight","transportation","supply chain","global trade","ocean freight","cargo","shipping lines","intermodal","forwarding","distribution","warehousing","stevedoring","terminal operations"],"linkedin_url":"https://www.linkedin.com/in/灵伟-金-70a12a173"},{"country":"China","company_name":"太平洋帝国","company_website":null,"industry":"Technology","num_employees":2,"annual_revenue":null,"name":"赵延涛","title":"CTO","recommended_email":null,"emails":[],"phones":[],"company_keyword":["shipping","logistics","ports","maritime","freight","transportation","supply chain","global trade","ocean freight","cargo","shipping lines","intermodal","forwarding","distribution","warehousing","stevedoring","terminal operations"],"linkedin_url":"https://www.linkedin.com/in/延涛-赵-324b2a130"}]}}

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
      })
      .subscribe({
      next: (data) => {
        this.conversation = data.conversation;
        this.prospects = data.prospect_output;
        if (this.prospects != null) {
          this.companysrv.postCompany(data.standardized_json).subscribe((company) => {
            console.log("Company: ",company);
            this.prospectsService.uploadProspects(data.prospect_output.results.map((pros:any)=> {
              this.companyId = company.data.id;
              return {
                ...pros,
                company_id:company.data.id
              }
            })).subscribe((propspects) => {
              this.showProspects = true;
              console.log("Prospects: ",propspects);
            })
          })
          // this.prospectsStore.setProspects(data.prospect_output.results);
          // this.compantStore.setCompany(data.standardized_json);
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
