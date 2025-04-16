import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { Cbutton1Component } from '../../components/cbutton1/cbutton1.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, Cbutton1Component],
  templateUrl: './account.component.html',
})
export class AccountComponent {
  heading = 'AI Agent';
  showProfileTabs = false;

  readonly profileRoutes = ['/account/user', '/account/billing', '/account/wallet', '/account/invoice'];

  readonly routesMap: { [key: string]: string } = {
    '/account/ai-agent': 'AI Agent',
    '/account/kpi': 'KPI',
    '/account/projects': 'Projects',
    '/account/leads': 'Leads',
    '/account/notifications': 'Notification',
  };

  constructor(private commonSrv: CommonService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.setHeading(event.urlAfterRedirects));
  }

  private setHeading(url: string): void {
    if (this.profileRoutes.some(route => url.startsWith(route))) {
      this.heading = 'User Profile';
    } else {
      const matched = Object.keys(this.routesMap).find(path => url.startsWith(path));
      this.heading = matched ? this.routesMap[matched] : 'SellersGPT';
    }
  }

  navigateAndSetTitle(section: string): void {
    this.closeProfileTabs();
    this.router.navigate([`/account/${section}`]);
  }

  toggleProfileTabs(): void {
    this.showProfileTabs = !this.showProfileTabs;

    if (this.showProfileTabs) {
      this.heading = 'User Profile';

      if (this.router.url === '/account/notifications') {
        this.router.navigate(['/account/user']);
      }
    }
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
    { route: 'user', label: 'User Settings' },
    { route: 'billing', label: 'Billing' },
    { route: 'wallet', label: 'Wallet' },
    { route: 'invoice', label: 'Invoice' },
  ];
}
