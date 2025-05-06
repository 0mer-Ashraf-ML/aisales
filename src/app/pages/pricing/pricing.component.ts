import { Component } from '@angular/core';
import { CtaComponent } from '../shared/components/cta/cta.component';
import { HeroComponent } from '../shared/components/hero/hero.component';
import { PaymentComponent } from '../pricing/components/payment/payment.component';
import { SalesProcessComponent } from './components/sales-process/sales-process.component';
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    HeroComponent,
    PaymentComponent,
    SalesProcessComponent,
    CtaComponent,
  ],
  templateUrl: './pricing.component.html',
})
export class PricingComponent {}
