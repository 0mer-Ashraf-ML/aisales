import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

interface SidebarItem {
  route: string;
  label: string;
  icon: string;
  displayName: string;
}

interface ProfileTab {
  route: string;
  label: string;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, RouterLinkActive],
  templateUrl: './account.component.html',
})
export class AccountComponent {
  heading = 'Dashboard';
  showProfileTabs = false;
  sidebarOpen = true;
  isDarkMode = false;

  sidebarItems: SidebarItem[] = [
    { route: '', label: 'Dashboard', icon: 'fa-table-columns', displayName: 'Dashboard' },
    { route: 'ai-agent', label: 'AI Agent', icon: 'fa-robot', displayName: 'AI Agent' },
    { route: 'kpi', label: 'KPI', icon: 'fa-chart-line', displayName: 'KPI' },
    { route: 'projects', label: 'Projects', icon: 'fa-folder', displayName: 'Projects' },
    { route: 'leads', label: 'Leads', icon: 'fa-phone', displayName: 'Leads' },
  ];

  profileTabs: ProfileTab[] = [
    { route: 'user-profile', label: 'User Profile' },
    { route: 'billing', label: 'Billing' },
    { route: 'wallet', label: 'Wallet' },
    { route: 'invoice', label: 'Invoice' },
  ];

  private readonly profileRoutes = this.profileTabs.map(tab => `/account/${tab.route}`);

  constructor(
    private router: Router,
    private commonSrv: CommonService,
    private themeService: ThemeService
  ) {
    this.themeService.currentTheme.subscribe(theme => this.isDarkMode = theme);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.showProfileTabs = this.profileRoutes.some(route => url.startsWith(route));
      this.setHeading(url);
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  navigate(item: SidebarItem) {
    this.closeProfileTabs();
    this.navigateTo(this.getRoute(item));
    this.heading = item.displayName;
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  toggleProfileTabs() {
    this.showProfileTabs = !this.showProfileTabs;
    if (this.showProfileTabs && !this.profileRoutes.some(route => this.router.url.startsWith(route))) {
      this.navigateTo('/account/user-profile');
    }
    this.heading = 'User Profile';
  }

  closeProfileTabs() {
    this.showProfileTabs = false;
  }

  logout() {
    this.commonSrv.logout();
    this.navigateTo('/');
  }

  getRoute(item: SidebarItem): string {
    return item.route ? `/account/${item.route}` : '/account';
  }

  private setHeading(url: string) {
    const cleanUrl = url.split(/[?#]/)[0];
    if (cleanUrl === '/account') {
      this.heading = 'Dashboard';
    } else if (this.profileRoutes.some(route => cleanUrl.startsWith(route))) {
      this.heading = 'User Profile';
    } else {
      const match = this.sidebarItems.find(item => `/account/${item.route}` === cleanUrl);
      this.heading = match?.displayName || 'Notifications';
    }
  }
}