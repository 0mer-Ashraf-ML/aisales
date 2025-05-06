import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class SolutionsComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router, private commonSrv: CommonService) {}
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
  applications: any[] = [
    {
      imgUrl:
        'solutions/b2b-sales/tqarget-b2b-buyers.jpg', alt: 'tqarget-b2b-buyers',
      desc: 'Targeting B2B Buyers',
    },
    {
      imgUrl:
        'solutions/b2b-sales/outreach-b2b-buyers.jpg', alt: 'outreach-b2b-buyers',
      desc: 'Outreach B2B Clients',
    },
    {
      imgUrl:
        'solutions/b2b-sales/connect-b2b-professionals.jpg', alt: 'connect-b2b-professionals',
      desc: 'Connect with B2B Professionals',
    },
  ];

  features: any[] = [
    {
      heading: 'Manufacturers / Retailers',
      imgUrl: 'solutions/applications/manufactures-retailers.jpg',
      alt: 'manufactures-retailers',
      desc: `Selling physical products? BAQ.ai connects you with global importers, overseas wholesalers, distributors, and end-users who traditionally rely on local suppliers. Break geographical barriers, access new markets, and accelerate growth with Al-driven insights. Transform your sales strategy today.`,
    },
    {
      heading: 'High Tech / SaaS',
      imgUrl: 'solutions/applications/high-tech-saas.jpg',
      alt: 'high-tech-saas',
      desc: `Looking for potential users or clients for your new services? BAQ.ai has you covered. Whether you're running PLG Al SaaS products or targeting clients already using competitors, we deliver better leads consistently. Transform your outreach and grow smarter today.`,
    },
    {
      heading: 'Recruiting / Connection',
      imgUrl: 'solutions/applications/recruiting-connection.jpg',
      alt: 'recruiting-connection',
      desc: `Whether you're selling premium services to B2B professionals, headhunters, or connecting with freelancers, BAQ.ai has the database, tactics, and workflows to make it happen fast and at scale. Achieve quick, impactful results and grow your business smarter today.`,
    },
  ];
}
