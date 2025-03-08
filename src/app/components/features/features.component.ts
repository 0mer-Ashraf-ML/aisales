import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './features.component.html'
})
export class FeaturesComponent {
cards:any[] = [
  {icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341139.png', title: 'First feature', desc: 'Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.', detail: 'Read more', link:'#'},
  {icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341134.png', title: 'Second feature', desc: 'Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.', detail: 'Read more',link:''},
  {icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341160.png', title: 'Third feature', desc: 'Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.', detail: 'Read more',link:''},
  {icon: 'https://cdn-icons-png.flaticon.com/512/4341/4341025.png', title: ' More features', desc: 'Neque Dolor, fugiat non cum doloribus aperiam voluptates nostrum.', detail: 'Read more',link:''}
];
}
