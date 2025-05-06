import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../../services/theme.service';
import { DOCUMENT } from '@angular/common';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  lastScrollTop = 0;
  isHeaderVisible = true;

  menuItems = [
    { label: 'Home', route: '/' },
    { label: 'Solutions', route: '/solutions' },
    { label: 'Pricing', route: '/pricing' },
  ];

  isDarkMode: boolean = false;
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private commonSrv: CommonService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.themeService.currentTheme.subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.commonSrv.isLoggedIn();
    window.addEventListener('scroll', this.onScroll, true);
  }
  
  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
  }
  
  onScroll = (): void => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > this.lastScrollTop && currentScroll > 100) {
      this.isHeaderVisible = false;
    } else {
      this.isHeaderVisible = true;
    }
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  };

  navigateToDashboardOrRegister() {
    if (this.isLoggedIn) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(fragment?: string): void {
    this.isMenuOpen = false;

    if (fragment) {
      setTimeout(() => {
        const element = this.document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  login(): void {
    if (this.isLoggedIn) {
      this.commonSrv.logout();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
