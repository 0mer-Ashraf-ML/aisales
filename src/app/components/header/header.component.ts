import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html'
})

export class HeaderComponent {

  menuItems = [
    { label: 'Features', link: 'features' },
    { label: 'Solution', link: 'solution' },
    { label: 'Testimonials', link: 'testimonials' },
    { label: 'Blog', link: 'blog' }
  ];

  isDarkMode: boolean = false;
  isMenuOpen: boolean = false;

  constructor(private themeService: ThemeService) {
    this.themeService.currentTheme.subscribe((theme) => {
      this.isDarkMode = theme;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }


  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
