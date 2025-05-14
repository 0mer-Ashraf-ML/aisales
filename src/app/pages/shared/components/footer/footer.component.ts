import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cbutton1Component } from '../cbutton1/cbutton1.component';
import { SlideUpDirective } from '../../../../directives/scroll-animate.directive';
import { ToastrService } from 'ngx-toastr';
import { EmailSubscriptionService } from '../../../../services/emailSubscription';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, Cbutton1Component, SlideUpDirective],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  menuItems = [
    { label: 'Home', link: '' },
    { label: 'Solutions', link: '/solutions' },
    { label: 'Pricing', link: '/pricing' },
  ];

  termsAndPrivacy = [
    { label: 'Privacy Policy', link: '/404' },
    { label: 'Terms and Conditions', link: '/404' },
  ];

  email = '';

  constructor(
    private emailSubscriptionService: EmailSubscriptionService,
    private toastr: ToastrService
  ) {}

  submitEmail(): void {
    if (!this.email) {
      this.toastr.warning('Please enter a valid email');
      return;
    }

    this.emailSubscriptionService.postEmail(this.email).subscribe({
      next: () => {
        this.toastr.success('Email subscription successful!');
        this.email = '';
      },
      error: (err) => {
        if (err.status === 409) {
          this.toastr.info('You are already subscribed.');
        } else {
          this.toastr.error('Subscription failed. Try again.');
        }
      },
    });
  }
}
