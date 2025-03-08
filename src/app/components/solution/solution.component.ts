import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solution.component.html'
})
export class SolutionComponent {
features:any[] = [
  {icon: 'fa-brands fa-rocketchat', title: 'Chat Anytime', desc: 'Asperiores nemo possimus nesciunt quam mollitia.'},
  {icon: 'fa-location-dot', title: 'Real Time Location', desc: 'Asperiores nemo possimus nesciunt quam mollitia.'},
];
}
