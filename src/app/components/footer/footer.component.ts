import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
menuItems:any[] = [
  {label: 'Home', link: ''},
  {label: 'About', link: ''},
  {label: 'Guide', link: ''},
  {label: 'Blocks', link: ''},
  {label: 'Contact', link: ''},
];

socialItems:any[] = [
  {label: 'Github', icon: 'fa-github', link: ''},
  {label: 'Twitter', icon: 'fa-github', link: ''},
  {label: 'YouTube', icon: 'fa-youtube', link: ''},
  {label: 'Facebook', icon: 'fa-facebook', link: ''},
  {label: 'Pintrest', icon: 'fa-pinterest', link: ''},
  {label: 'Instagram', icon: 'fa-instagram', link: ''}
];

termsAndPrivacy:any[] = [
  {label: 'Terms of Use', link: ''},
  {label: 'Privacy Policy', link: ''},
];
}