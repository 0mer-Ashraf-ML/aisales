import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cbutton1Component } from "../cbutton1/cbutton1.component";
import { Cbutton2Component } from "../cbutton2/cbutton2.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, CommonModule, Cbutton1Component, Cbutton2Component],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
features:any[] = [
  {imgUrl: 'https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80', title: 'Less Cost', desc: 'Slash customer acquisition costs by 50%+ with precision targeting and zero wasted ad spend.'},
  {imgUrl: 'https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80', title: 'Less Job', desc: 'Avoid costly new hiring and stay ahead of trends without investing in new tools or training.'},
  {imgUrl: 'https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80', title: 'Less Guesswork', desc: 'Replace trial-and-error with predictive precision: Al targets high-value leads and reduces wasted spend.'},
  {imgUrl: 'https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80', title: 'More Leads', desc: 'Tap into Al-powered prospecting to uncover 10X more leads while prioritizing high-intent prospects.'},
  {imgUrl: 'https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80', title: 'More Focus', desc: 'Automate repetitive tasks and redirect 80%+ of your team’s effort to strategic growth initiatives.'},
  {imgUrl: 'https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80', title: 'More Conversion', desc: 'Deliver tailored messaging at scale, driving 100%+ higher conversion rates across channels.'},
];

clients:any[] = [
  './images/clients/microsoft.svg',
  './images/clients/airbnb.svg',
  './images/clients/google.svg',
  './images/clients/ge.svg',
  './images/clients/netflix.svg',
  './images/clients/google-cloud.svg',
];
}
