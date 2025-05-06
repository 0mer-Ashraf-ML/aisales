import { Component } from '@angular/core';
import { TypewriterDirective } from '../../../../directives/typewriter.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [TypewriterDirective, CommonModule],
  templateUrl: './applications.component.html',
  styles: ``
})
export class ApplicationsComponent {
  applications: any[] = [
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
