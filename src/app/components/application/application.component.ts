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
    {imgUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80', imgText: 'Saas', desc: 'Drive SaaS Growth with Effortless Lead Capture'},
    {imgUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80', imgText: 'Fintech', desc: 'Attract Fintech Clients with Precision Targeting'},
    {imgUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80', imgText: 'Enterprise service', desc: 'Expand Enterprise Reach with Smart Client Acquisition'},
    {imgUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80', imgText: 'Exporters', desc: 'Boost Export Business with Global Customer Engagement'},
    {imgUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80', imgText: 'B2B', desc: 'Grow Local B2B Networks with Seamless Lead Conversion'},
    {imgUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80', imgText: 'Event Organizer', desc: 'Maximize Event ROI with High-Impact Attendee Attraction'},
  ];
}