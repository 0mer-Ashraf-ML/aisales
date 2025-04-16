import { Component } from '@angular/core';
import { Cbutton1Component } from '../../components/cbutton1/cbutton1.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-free',
  standalone: true,
  imports: [Cbutton1Component, RouterLink, CommonModule],
  templateUrl: './join-free.component.html',
})
export class JoinFreeComponent {
  applications: any[] = [
    {
      imgUrl:
        'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
      desc: 'Targeting B2B Buyers',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
      desc: 'Outreach B2B Clients',
    },
    {
      imgUrl:
        'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
      desc: 'Connect with B2B Professionals',
    },
  ];

  features: any[] = [
    {
      heading: 'Manufacturers / Retailers',
      imgUrl: '/public/ai-sales.avif',
      desc: `Selling physical products? BAQ.ai connects you with global importers, overseas wholesalers, distributors, and end-users who traditionally rely on local suppliers. Break geographical barriers, access new markets, and accelerate growth with Al-driven insights. Transform your sales strategy today.`,
    },
    {
      heading: 'High Tech / SaaS',
      imgUrl: '/public/ai-sales.avif',
      desc: `Looking for potential users or clients for your new services? BAQ.ai has you covered. Whether you're running PLG Al SaaS products or targeting clients already using competitors, we deliver better leads consistently. Transform your outreach and grow smarter today.`,
    },
    {
      heading: 'Recruiting / Connection',
      imgUrl: '/public/ai-sales.avif',
      desc: `Whether you're selling premium services to B2B professionals, headhunters, or connecting with freelancers, BAQ.ai has the database, tactics, and workflows to make it happen fast and at scale. Achieve quick, impactful results and grow your business smarter today.`,
    },
  ];
}
