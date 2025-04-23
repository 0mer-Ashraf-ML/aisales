import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { Cbutton1Component } from '../../components/cbutton1/cbutton1.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import {
  loadStripe,
  PaymentIntent,
  Stripe,
  StripeElements,
  StripeError,
} from '@stripe/stripe-js';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TypewriterDirective } from '../../directives/typewriter.directive';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, Cbutton1Component, MatIconModule, ToastrModule, TypewriterDirective],
  templateUrl: './pricing.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PricingComponent {
  private authService = inject(AuthService);
  private stripePromise: Promise<Stripe | null>;
  private elements: StripeElements | null = null;
  private clientSecret: string | null = null;
  isModalOpen = false; // Control modal visibility
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private commonSrv: CommonService
  ) {
    this.stripePromise = loadStripe(
      'pk_test_51R1PxbCrZdCbaztHviwuR41rMsyn2hQENRUYLFOxZ7u9CAxSyY6BbIWePz5llghs05knPzqdgmEVexPKb4jbmn7800Go3twC6N'
    ); // Replace with your actual public key
  }
  ngOnInit() {
    this.isLoggedIn = this.commonSrv.isLoggedIn();

    this.route.queryParams.subscribe((params) => {
      if (params['redirect_status'] === 'succeeded') {
        alert('Payment successful! 🎉');

        // ✅ Clear URL params after displaying message
        this.router.navigate([], { queryParams: {} });
      }
    });
  }
  alert: string = '';
  confirm() {
    alert('hi');
  }
  pricingPlans: any[] = [
    {
      type: 'Basic',
      price: '$10',
      desc: 'Starts with 1GB free cluster, no credit card required.',
      features: [
        '1GB free forever cluster. No credit card required.',
        'Fully managed with central cluster management',
        'Multiple cloud providers and regions (AWS, GCP, Azure)',
        'Horizontal & vertical scaling',
      ],
    },
    {
      type: 'Premium',
      price: '$20',
      desc: 'Starts with 1GB free cluster, no credit card required.',
      features: [
        '1GB free forever cluster. No credit card required.',
        'Fully managed with central cluster management',
        'Multiple cloud providers and regions (AWS, GCP, Azure)',
        'Horizontal & vertical scaling',
        'Standard support and uptime SLAs, can be upgraded to Premium',
      ],
    },
    {
      type: 'Enterprise',
      price: '$30',
      desc: 'Starts with 1GB free cluster, no credit card required.',
      features: [
        '1GB free forever cluster. No credit card required.',
        'Fully managed with central cluster management',
        'Multiple cloud providers and regions (AWS, GCP, Azure)',
        'Horizontal & vertical scaling',
        'Premium Support Plan',
      ],
    },
  ];

  async openCheckout(planType: string) {
    this.isModalOpen = true;
    console.log('In open: ', this.isModalOpen);
    const stripe = await this.stripePromise;
    if (!stripe) {
      console.error('Stripe failed to load.');
      return;
    }
    console.log(this.commonSrv.getUser())

    const stripeId = this.commonSrv.getUser()?.stripe_customer_id;
    if (!stripeId) {
      this.toastr.error('Stripe ID not found', '', {
        timeOut: 3000
      });
      return;
    }

    // Convert amount to cents
    const amount =
      (planType === 'Basic' ? 10 : planType === 'Premium' ? 20 : 30) * 100;
    const currency = 'usd';

    this.authService.stripePaymentIntent(amount, currency, stripeId).subscribe({
      next: async (response) => {
        if (!response?.data?.client_secret) {
          console.error(
            'Error: client_secret is missing in the response',
            response
          );
          return;
        }

        this.clientSecret = response.data.client_secret;
        console.log('Received client_secret:', this.clientSecret);
        if (!this.clientSecret) return;
        // ✅ Create elements instance and store it
        this.elements = stripe.elements({ clientSecret: this.clientSecret });

        // ✅ Create and mount the Payment Element
        const paymentElement = this.elements.create('payment', {
          layout: 'accordion',
        });
        paymentElement.mount('#payment-element-modal');

        // ✅ Show the modal
        const modal = document.getElementById('stripeModal');
        if (modal) {
          modal.style.display = 'block';
        } else {
          console.error('Error: #stripeModal element not found in the DOM.');
        }
      },
      error: (error) => console.error('Error fetching client secret:', error),
    });
  }

  // Function to confirm payment when "Pay Now" is clicked
  async confirmPayment() {
    this.toastr.success('Payment successful!', 'Success 🎉');
    const stripe = await this.stripePromise;
    if (!stripe) {
      console.error('Stripe failed to load.');
      return;
    }

    if (!this.clientSecret || !this.elements) {
      console.error('No clientSecret or elements found.');
      return;
    }

    // ✅ Submit elements before confirming the payment
    const submitResult = await this.elements.submit();
    if (submitResult.error) {
      console.error('Error submitting elements:', submitResult.error.message);
      alert(`Payment submission failed: ${submitResult.error.message}`);
      return;
    }

    // ✅ Now confirm the payment
    const response: { error?: StripeError; paymentIntent?: PaymentIntent } =
      await stripe.confirmPayment({
        elements: this.elements, // ✅ Use the stored elements instance
        clientSecret: this.clientSecret,
        confirmParams: {
          return_url: window.location.origin, // Redirect after successful payment
        },
      });

    if (response.error) {
      console.error('Payment failed:', response.error.message);
      alert(`Payment failed: ${response.error.message}`);
      return;
    }

    if (
      response.paymentIntent &&
      response.paymentIntent.status === 'succeeded'
    ) {
      console.log('Payment successful!', response.paymentIntent);
      document.getElementById('stripeModal')!.style.display = 'none';
      alert('Payment Successful!');
    } else {
      console.error('Unexpected response from Stripe:', response);
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.cdr.detectChanges();
    const modal = document.getElementById('stripeModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


  // Solution page
  isLoggedIn = false;
  
    navigateToDashboardOrRegister(): void {
      if (this.isLoggedIn) {
        this.router.navigate(['/account']);
      } else {
        this.router.navigate(['/register']);
      }
    }
    
  applications = [
    {
      imgUrl: 'your-image-url-1.avif',
      desc: 'Zero Budget Commitments',
    },
    {
      imgUrl: 'your-image-url-2.avif',
      desc: 'No Monthly/Annual Fees',
    },
    {
      imgUrl: 'your-image-url-3.avif',
      desc: 'Pay for Quality Work',
    },
  ];

  steps = [
    {
      heading: 'Step 1: Create Your First Project',
      text: 'Our AI dynamically calculates CPL (Cost Per Lead) based on your industry and market conditions. To get started:',
      points: [
        'Register and create your initial project',
        'Provide basic business information through our onboarding flow',
        'Receive instant CPL recommendations tailored to your specific vertical',
      ],
      note: `Note: Industry-specific CPL benchmarks remain proprietary — you'll see customized pricing only after project creation.`,
    },
    {
      heading: 'Step 2: Set Up Payment Methods',
      text: 'Before campaign launch:',
      points: [
        'Securely add payment options to your account',
        "Maintain a minimum wallet balance (similar to Google Ads' prepay system)",
        'Authorize automatic deductions for lead acquisitions',
      ],
      note: `Your campaigns activate immediately upon meeting these requirements, enabling our Al sales agents to begin prospect outreach.`,
    },
    {
      heading: 'Step 3: AI-Powered Lead Verification & Smart Billing',
      text: 'Our system autonomously applies your ICP criteria through three core mechanisms:',
      points: [
        'Automated ICP Matching: Instant evaluation against 20+ key parameters',
        'Self-Optimizing Filters: Continuous calibration of qualification thresholds',
        'Two-Tier Validation',
      ],
      subPoints: [
        'Company profile verification',
        'Decision-maker profile / behavior analysis',
      ],
      billingLogic: [
        'Charges only for ICP-compliant leads',
        'Non-compliant leads archived with free access',
        'Full automation ensures 100% consistent application of your preconfigured ICP standards.',
      ],
    },
  ];
}
