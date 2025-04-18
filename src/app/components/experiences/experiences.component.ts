import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TypewriterDirective } from '../../directives/typewriter.directive';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  templateUrl: './experiences.component.html'
})
export class ExperiencesComponent {
  experiences:any[] = [
    {imgUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80', imgText: 'Chat', desc: 'Simply chat with our AI Sales Consultant to define your goals and requirement—nso software setup or technical input needed. We handle the heavy lifting, so you can focus on what matters most: growing your business.'},
    {imgUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80', imgText: 'Automate', desc: `Our system takes over the routine tasks, automatically identifying and nurturing potential leads. You'll receive real-time updates on high-quality prospects, allowing you to follow up at the perfect moment without any manual effort.`},
    {imgUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80', imgText: 'Leads', desc: 'Every lead 1s automatically screened and scored based on our criteria. You only pay for qualified leads, ensuring maximum ROI. Plus, seamlessly sync these leads directly into your CRM for a frictionless workflow.'},
  ];
}
