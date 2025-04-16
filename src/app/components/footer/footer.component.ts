import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cbutton1Component } from '../cbutton1/cbutton1.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, Cbutton1Component],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
menuItems:any[] = [
  {label: 'Home', link: ''},
  {label: 'Solutions', link: '/solutions'},
  {label: 'Pricing', link: '/pricing'},
];

termsAndPrivacy:any[] = [
  {label: 'Privacy Policy', link: '/404'},
  {label: 'Terms and Conditions', link: '/404'},
];
}