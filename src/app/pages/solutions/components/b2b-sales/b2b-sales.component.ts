import { Component } from '@angular/core';
import { TypewriterDirective } from '../../../../directives/typewriter.directive';
import { CommonModule } from '@angular/common';
import { SlideUpDirective } from '../../../../directives/scroll-animate.directive';

@Component({
  selector: 'app-b2b-sales',
  standalone: true,
  imports: [TypewriterDirective, CommonModule, SlideUpDirective],
  templateUrl: './b2b-sales.component.html',
  styles: ``,
})
export class B2bSalesComponent {
  features: any[] = [
    {
      imgUrl: 'solutions/b2b-sales/tqarget-b2b-buyers.jpg',
      alt: 'tqarget-b2b-buyers',
      desc: 'Targeting B2B Buyers',
    },
    {
      imgUrl: 'solutions/b2b-sales/outreach-b2b-buyers.jpg',
      alt: 'outreach-b2b-buyers',
      desc: 'Outreach B2B Clients',
    },
    {
      imgUrl: 'solutions/b2b-sales/connect-b2b-professionals.jpg',
      alt: 'connect-b2b-professionals',
      desc: 'Connect with B2B Professionals',
    },
  ];
}
