import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html'
})
export class TestimonialsComponent {
testimonials:any[] = [
  {imgUrl: './images/avatars/avatar.webp', name: 'Daniella Doe', designation: 'Mobile dev', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloremque.'},
  {imgUrl: './images/avatars/avatar-1.webp', name: 'Jane doe', designation: 'Marketing', desc: 'Lorem ipsum dolor laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.'},
  {imgUrl: './images/avatars/avatar-2.webp', name: 'Yanick Doe', designation: 'Developer', desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint cumq quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.'},
  {imgUrl: './images/avatars/avatar-3.webp', name: 'Jane Doe', designation: 'Mobile dev', desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.'},
  {imgUrl: './images/avatars/avatar-4.webp', name: 'Andy Doe', designation: 'Manager', desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.'},
  {imgUrl: './images/avatars/avatar-2.webp', name: 'Yanndy Doe', designation: 'Mobile dev', desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto laboriosam deleniti aperiam ab veniam sint non cumque quis tempore cupiditate. Sint libero voluptas veniam at reprehenderit, veritatis harum et rerum.'},
];
}
