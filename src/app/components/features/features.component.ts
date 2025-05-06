import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TypewriterDirective } from '../../directives/typewriter.directive';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  templateUrl: './features.component.html'
})
export class FeaturesComponent {
  features:any[] = [
    {imgUrl: 'home/features/less-customer-acquisition-cost.jpg', alt: 'less-customer-acquisition-cost', title: 'Less Cost', desc: 'Slash customer acquisition costs by 50%+ with precision targeting and zero wasted ad spend.'},
    {imgUrl: 'home/features/less-job.jpg', alt: 'less-job', title: 'Less Job', desc: 'Avoid costly new hiring and stay ahead of trends without investing in new tools or training.'},
    {imgUrl: 'home/features/less-guesswork.jpg', alt: 'less-guesswork', title: 'Less Guesswork', desc: 'Replace trial-and-error with predictive precision: Al targets high-value leads and reduces wasted spend.'},
    {imgUrl: 'home/features/10-times-more-leads.jpg', alt: '10-times-more-leads', title: 'More Leads', desc: 'Tap into Al-powered prospecting to uncover 10X more leads while prioritizing high-intent prospects.'},
    {imgUrl: 'home/features/more-focus-growth-initiatives.jpg', alt: 'more-focus-growth-initiatives', title: 'More Focus', desc: 'Automate repetitive tasks and redirect 80%+ of your team’s effort to strategic growth initiatives.'},
    {imgUrl: 'home/features/more-conversion.jpg', alt: 'more-conversion', title: 'More Conversion', desc: 'Deliver tailored messaging at scale, driving 100%+ higher conversion rates across channels.'},
  ];
}
