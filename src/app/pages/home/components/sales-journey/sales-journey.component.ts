import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TypewriterDirective } from '../../../../directives/typewriter.directive';
import { SlideUpDirective } from '../../../../directives/scroll-animate.directive';

@Component({
  selector: 'app-sales-journey',
  standalone: true,
  imports: [CommonModule, TypewriterDirective, SlideUpDirective],
  templateUrl: './sales-journey.component.html'
})
export class SalesJourneyComponent {
  experiences:any[] = [
    {imgUrl: 'home/sales-journey/chat-with-ai-sales-consultant.jpg', alt:'chat-with-ai-sales-consultant', imgText: 'Chat', desc: 'Simply chat with our AI Sales Consultant to define your goals and requirement—nso software setup or technical input needed. We handle the heavy lifting, so you can focus on what matters most: growing your business.'},
    {imgUrl: 'home/sales-journey/automate-leads.jpg', alt:'automate-leads', imgText: 'Automate', desc: `Our system takes over the routine tasks, automatically identifying and nurturing potential leads. You'll receive real-time updates on high-quality prospects, allowing you to follow up at the perfect moment without any manual effort.`},
    {imgUrl: 'home/sales-journey/leads-generation.jpg', alt:'leads-generation', imgText: 'Leads', desc: 'Every lead 1s automatically screened and scored based on our criteria. You only pay for qualified leads, ensuring maximum ROI. Plus, seamlessly sync these leads directly into your CRM for a frictionless workflow.'},
  ];
}
