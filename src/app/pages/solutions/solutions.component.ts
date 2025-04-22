import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Cbutton1Component } from '../../components/cbutton1/cbutton1.component';
import { TypewriterDirective } from '../../directives/typewriter.directive';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, RouterLink, Cbutton1Component, TypewriterDirective],
  templateUrl: './solutions.component.html',
  styles: ``,
})
export class SolutionsComponent {
    isLoggedIn = false;
  
    constructor(
      private router: Router,
      private commonSrv: CommonService
    ) {}
  
    ngOnInit() {
      this.isLoggedIn = this.commonSrv.isLoggedIn();
    }
  
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
