import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TypewriterDirective } from '../../../../directives/typewriter.directive';

@Component({
  selector: 'app-sales-process',
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  templateUrl: './sales-process.component.html',
  styles: ``
})
export class SalesProcessComponent {
  steps:any[] = [
    {
      heading: 'Step 1: Create Your First Project',
      text: 'Our AI dynamically calculates CPL (Cost Per Lead) based on your industry and market conditions. To get started:',
      imgUrl: 'pricing/process/create-project.jpg',
      alt: 'create-project',
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
      imgUrl: 'pricing/process/setup-payment-method.jpg',
      alt: 'setup-payment-method',
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
      imgUrl: 'pricing/process/lead-verification-and-smart-billing.jpg',
      alt: 'lead-verification-and-smart-billing',
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
