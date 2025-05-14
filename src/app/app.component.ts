import { HeaderComponent } from './pages/shared/components/header/header.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './pages/shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import '@iconify/iconify';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'SellersGPT';

  emptyLayout = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonSrv: CommonService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.commonSrv.getConfig();

    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.emptyLayout =
        currentRoute.includes('prospects') ||
        currentRoute.includes('login') ||
        currentRoute.includes('register') ||
        currentRoute.includes('chatbot') ||
        currentRoute.includes('forgot-password') ||
        currentRoute.includes('otp-verification') ||
        currentRoute.includes('reset-password') ||
        currentRoute.includes('otp-verification') ||
        currentRoute.includes('account');
    });

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          const elementTop = element.getBoundingClientRect().top;
          const headerHeight =
            document.querySelector('header')?.clientHeight || 0;
          window.scrollTo({
            top: elementTop + window.pageYOffset - headerHeight,
            behavior: 'smooth',
          });
        }
      }
    });
  }
}
