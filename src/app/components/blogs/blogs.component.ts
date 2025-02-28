import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {
  blogs:any[] = [
    {imgUrl: 'https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80', title: 'De fuga fugiat lorem ispum laboriosam expedita.', desc:'Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...', detail: 'Read more', link: ''},
    {imgUrl: 'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80', title: 'De fuga fugiat lorem ispum laboriosam expedita.', desc:'Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...', detail: 'Read more', link: ''},
    {imgUrl: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80', title: 'De fuga fugiat lorem ispum laboriosam expedita.', desc:'Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...', detail: 'Read more', link: ''},
  ];
}
