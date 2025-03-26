import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  menuItems = [
    { label: 'Features', link: 'features' },
    { label: 'Solution', link: 'solution' },
    { label: 'Testimonials', link: 'testimonials' },
    { label: 'Blog', link: 'blog' },
  ];

  isDarkMode: boolean = false;
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('token') ? true : false;
  }

  constructor(
    private themeService: ThemeService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.themeService.currentTheme.subscribe((theme) => {
      this.isDarkMode = theme;
    });
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
      }, 100); // Small delay ensures the DOM updates before scrolling
    }
  }

  login() {
    if (this.isLoggedIn) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
