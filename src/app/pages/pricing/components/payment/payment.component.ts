import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TypewriterDirective } from '../../../../directives/typewriter.directive';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  templateUrl: './payment.component.html',
  styles: ``
})
export class PaymentComponent {
  features: any[] = [
    {
      imgUrl: 'pricing/payment/zero-budget-commitments.jpg',
      alt: 'zero-budget-commitments',
      desc: 'Zero Budget Commitments',
    },
    {
      imgUrl: 'pricing/payment/no-monthly-annual-fees.jpg',
      alt: 'zero-monthly-annual-fees',
      desc: 'No Monthly/Annual Fees',
    },
    {
      imgUrl: 'pricing/payment/pay-for-quality-work.jpg',
      alt: 'pay-for-quality-work',
      desc: 'Pay for Quality Work',
    },
  ];
}
