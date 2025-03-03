import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProspectsStore {
  prospects = signal<any>(null);

  setProspects(data: any): void {
    this.prospects.set(data);
  }

  clearProspects(): void {
    this.prospects.set(null);
  }
}
