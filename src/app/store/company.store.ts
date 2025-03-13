import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyStore {
  private localStorageKey = 'company';
  company = signal<any>(this.loadFromLocalStorage());

  constructor() {
    this.listenForStorageChanges();
  }

  setCompany(data: any): void {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(this.localStorageKey, jsonData);
      this.company.set(data);
    } catch (error) {
      console.error('Error saving prospects to localStorage:', error);
    }
  }

  clearCompany(): void {
    this.company.set(null);
    localStorage.removeItem(this.localStorageKey);
  }

  private loadFromLocalStorage(): any {
    try {
      const storedData = localStorage.getItem(this.localStorageKey);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Error loading company from localStorage:', error);
      return null;
    }
  }

  private listenForStorageChanges(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === this.localStorageKey) {
        try {
            this.company.set(event.newValue ? JSON.parse(event.newValue) : null);
        } catch (error) {
          console.error('Error syncing prospects across tabs:', error);
        }
      }
    });
  }
}
