import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProspectsStore {
  private localStorageKey = 'prospects';
  prospects = signal<any>(this.loadFromLocalStorage());

  constructor() {
    this.listenForStorageChanges();
  }

  setProspects(data: any): void {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(this.localStorageKey, jsonData);
      this.prospects.set(data);
    } catch (error) {
      console.error('Error saving prospects to localStorage:', error);
    }
  }

  clearProspects(): void {
    this.prospects.set(null);
    localStorage.removeItem(this.localStorageKey);
  }

  private loadFromLocalStorage(): any {
    try {
      const storedData = localStorage.getItem(this.localStorageKey);
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error('Error loading prospects from localStorage:', error);
      return null;
    }
  }

  private listenForStorageChanges(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === this.localStorageKey) {
        try {
          this.prospects.set(event.newValue ? JSON.parse(event.newValue) : null);
        } catch (error) {
          console.error('Error syncing prospects across tabs:', error);
        }
      }
    });
  }
}
