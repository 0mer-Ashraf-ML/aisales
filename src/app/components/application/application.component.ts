import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cbutton1Component } from "../cbutton1/cbutton1.component";
import { RouterLink } from '@angular/router';
import { TypewriterDirective } from '../../directives/typewriter.directive';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule, Cbutton1Component, RouterLink, TypewriterDirective],
  templateUrl: './application.component.html'
})
export class ApplicationComponent {
  applications:any[] = [
    {imgUrl: 'home/applications/saas-growth.jpg', alt: 'saas-growth', imgText: 'Saas', desc: 'Drive SaaS Growth with Effortless Lead Capture'},
    {imgUrl: 'home/applications/fintech-clients.jpg', alt: 'fintech-clients', imgText: 'Fintech', desc: 'Attract Fintech Clients with Precision Targeting'},
    {imgUrl: 'home/applications/enterprise-service.jpg', alt: 'enterprise-service', imgText: 'Enterprise service', desc: 'Expand Enterprise Reach with Smart Client Acquisition'},
    {imgUrl: 'home/applications/boost-export-business.jpg', alt: 'boost-export-business', imgText: 'Exporters', desc: 'Boost Export Business with Global Customer Engagement'},
    {imgUrl: 'home/applications/grow-b2b-networks.jpg', alt: 'grow-b2b-networks', imgText: 'B2B', desc: 'Grow Local B2B Networks with Seamless Lead Conversion'},
    {imgUrl: 'home/applications/event-organizer.jpg', alt: 'event-organizer', imgText: 'Event Organizer', desc: 'Maximize Event ROI with High-Impact Attendee Attraction'},
  ];
}