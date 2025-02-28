import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Cbutton1Component } from '../../components/cbutton1/cbutton1.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, Cbutton1Component, MatIconModule],
  templateUrl: './pricing.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PricingComponent {
  alert:string = '';
  confirm() {
    alert('hi')
  }
  pricingPlans:any[] = [
    {
      type: 'Basic',
      price: '$10',
      desc: 'Starts with 1GB free cluster, no credit card required.',
      features: ['1GB free forever cluster. No credit card required.', 'Fully managed with central cluster management', 'Multiple cloud providers and regions (AWS, GCP, Azure)', 'Horizontal & vertical scaling']
    },
    {
      type: 'Premium',
      price: '$20',
      desc: 'Starts with 1GB free cluster, no credit card required.',
      features: ['1GB free forever cluster. No credit card required.', 'Fully managed with central cluster management', 'Multiple cloud providers and regions (AWS, GCP, Azure)', 'Horizontal & vertical scaling', 'Standard support and uptime SLAs, can be upgraded to Premium']
    },
    {
      type: 'Enterprise',
      price: '$30',
      desc: 'Starts with 1GB free cluster, no credit card required.',
      features: ['1GB free forever cluster. No credit card required.', 'Fully managed with central cluster management', 'Multiple cloud providers and regions (AWS, GCP, Azure)', 'Horizontal & vertical scaling', 'Premium Support Plan']
    },
  ];
}
