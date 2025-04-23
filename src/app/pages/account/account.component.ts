import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule,],
  templateUrl: './account.component.html',
})
export class AccountComponent {
  heading = 'AI Agent';
  showProfileTabs = false;
  isDarkMode: boolean = false;

  readonly profileRoutes = ['/account/user', '/account/billing', '/account/wallet', '/account/invoice'];

  readonly routesMap: { [key: string]: string } = {
    '/account/ai-agent': 'AI Agent',
    '/account/kpi': 'KPI',
    '/account/projects': 'Projects',
    '/account/leads': 'Leads',
    '/account/notifications': 'Notification',
  };

  constructor(private commonSrv: CommonService, private router: Router, private themeService: ThemeService,) {
    this.themeService.currentTheme.subscribe((theme) => {
      this.isDarkMode = theme;
    });
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
  
        // Auto toggle based on current route
        this.showProfileTabs = this.profileRoutes.some(route => url.startsWith(route));
        this.setHeading(url);
      });
  }

  private setHeading(url: string): void {
    if (url === '/account') {
      this.heading = ''; // Special case: show logo instead of text
    } else if (this.profileRoutes.some(route => url.startsWith(route))) {
      this.heading = 'User Profile';
    } else {
      const matched = Object.keys(this.routesMap).find(path => url.startsWith(path));
      this.heading = matched ? this.routesMap[matched] : 'SellersGPT';
    }
  }

  navigateAndSetTitle(section: string): void {
    this.closeProfileTabs(); // hides profile tabs
    this.router.navigate([`/account/${section}`]);
  }
  

  toggleProfileTabs(): void {
    this.showProfileTabs = !this.showProfileTabs;
  
    if (this.showProfileTabs) {
      this.heading = 'User Profile';
  
      // Redirect to default profile tab if not already in profile routes
      if (!this.profileRoutes.includes(this.router.url)) {
        this.router.navigate(['/account/user-profile']);
      }
    }
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  closeProfileTabs(): void {
    this.showProfileTabs = false;
  }

  logout(): void {
    this.commonSrv.logout();
    this.router.navigate(['/']);
  }

  sidebarItems = [
    { route: 'ai-agent', label: 'AI Agent', icon: 'fa-robot' },
    { route: 'kpi', label: 'KPI', icon: 'fa-chart-line' },
    { route: 'projects', label: 'Projects', icon: 'fa-folder' },
    { route: 'leads', label: 'Leads', icon: 'fa-phone' },
  ];
  
  profileTabs = [
    { route: 'user-profile', label: 'User Profile' },
    { route: 'billing', label: 'Billing' },
    { route: 'wallet', label: 'Wallet' },
    { route: 'invoice', label: 'Invoice' },
  ];
}
