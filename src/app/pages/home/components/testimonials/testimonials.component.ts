import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TypewriterDirective } from '../../../../directives/typewriter.directive';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {
testimonials:any[] = [
  {imgUrl: 'profile.png', name: 'Sarah Kim', designation: 'COO Precision Manufacturing Group', desc: `Our sales team was drowning in RFQs. The Al agent now handles 73% of technical inquiries, freeing engineers to focus on complex projects. Last quarter's conversion rate jumped 41% - numbers even our skeptics can't ignore.`},
  {imgUrl: 'profile.png', name: 'Raj Patel', designation: `Director of Int'l Operations GlobalTrade Solutions Inc.`, desc: 'Time zones used to cost us deals. The Al agent closed 22% more Latin American clients by negotiating in Spanish at 2AM local time. It even caught payment term discrepancies our human team missed.'},
  {imgUrl: 'profile.png', name: 'Emily Laurent', designation: 'VP Client Experience LuxeHome Brands', desc: 'Our high-touch clients demanded white-glove service. The Al concierge maintains 94% satisfaction scores while handling routine requests, allowing our specialists to deepen relationships with top accounts.'},
  {imgUrl: 'profile.png', name: 'Michael Tan', designation: `Managing Partner EliteBiz Advisors`, desc: `Proposal drafting consumed 15hrs/week. The Al agent now generates compliant RFP responses in 8 minutes, maintaining our exacting quality standards. Client acquisition costs dropped 28% last quarter.`},
  {imgUrl: 'profile.png', name: 'Olivia Werner', designation: 'Event Tech Director ExpoConnect International', desc: `Post-event lead follow-up was our Achilles' heel. The Al agent engaged 89% of booth visitors within 2 hours, converting 17% to qualified leads - outperforming our manual process by 3X.`},
];
}
