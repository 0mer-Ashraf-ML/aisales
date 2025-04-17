import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { DOCUMENT } from '@angular/common';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
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
    if(this.isLoggedIn){
      this.menuItems.push({ label: 'Dashboard', route: '/account' })
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