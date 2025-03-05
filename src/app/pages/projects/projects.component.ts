import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  isExpanded: boolean = false;
  
details:any[] = [
  {
    title: 'New Visitors',
    quantity: '100'
  },
  {
    title: 'Unique Visitors ',
    quantity: '90'
  },
  {
    title: 'Leads',
    quantity: '30'
  },
  {
    title: 'Avg. Leads Score ',
    quantity: '30'
  },
  {
    title: 'MQL',
    quantity: '5'
  },
  {
    title: 'CPL',
    quantity: ' $5'
  },
];
}
