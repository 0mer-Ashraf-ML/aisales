import { Component } from '@angular/core';
import { HeroComponent } from '../shared/components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { SalesJourneyComponent } from './components/sales-journey/sales-journey.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CtaComponent } from '../shared/components/cta/cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturesComponent,
    ClientsComponent,
    PaymentComponent,
    ApplicationsComponent,
    SalesJourneyComponent,
    TestimonialsComponent,
    CtaComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'AI Sales';
}
