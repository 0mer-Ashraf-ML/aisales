import { HeaderComponent } from './components/header/header.component';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import '@iconify/iconify'
import { CommonService } from './services/common.service';
import { v4 as uuidv4 } from 'uuid';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'ai-sales';

  emptyLayout = true;


  constructor(private router: Router,private route: ActivatedRoute, private commonSrv: CommonService) {

    
  }

  async ngOnInit(): Promise<void> {
    
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.emptyLayout = currentRoute.includes('login') || currentRoute.includes('register') || currentRoute.includes('chatbot') || currentRoute.includes('forgot-password') || currentRoute.includes('otp-verification') || currentRoute.includes('reset-password') || currentRoute.includes('otp-verification') || currentRoute.includes('account');;
    });
  
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          const elementTop = element.getBoundingClientRect().top;
          const headerHeight = document.querySelector('header')?.clientHeight || 0;
          window.scrollTo({
            top: elementTop + window.pageYOffset - headerHeight,
            behavior: 'smooth'
          });
        }
      }
    });
    localStorage.setItem('sessionId',uuidv4())
    await this.commonSrv.getConfig();
  }  
}
