import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cbutton1Component } from "../cbutton1/cbutton1.component";
import { Cbutton2Component } from "../cbutton2/cbutton2.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, CommonModule, Cbutton1Component, Cbutton2Component],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
features:any[] = [
  {title: 'The lowest price', desc: 'Some text here'},
  {title: 'The fastest on the market', desc: 'Some text here'},
  {title: 'The most loved', desc: 'Some text here'},
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
