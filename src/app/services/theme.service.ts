import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import Iconify from '@iconify/iconify/dist/iconify.js';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  currentTheme = this.isDarkMode.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') === 'dark';
    this.isDarkMode.next(savedTheme);
    this.updateTheme(savedTheme);
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkMode.value;
    this.isDarkMode.next(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    this.updateTheme(newTheme);
  }

  private updateTheme(isDark: boolean): void {
    if (isDark) {
      this.document.body.classList.add('dark');
    } else {
      this.document.body.classList.remove('dark');
    }
  }
}
