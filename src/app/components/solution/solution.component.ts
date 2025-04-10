import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cbutton1Component } from "../cbutton1/cbutton1.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [CommonModule, Cbutton1Component, RouterLink],
  templateUrl: './solution.component.html'
})
export class SolutionComponent {
features:any[] = [
  {icon: 'fa-check', desc: 'No Budget of Commitments'},
  {icon: 'fa-check',  desc: 'No Monthly / Annual Software Charge'},
  {icon: 'fa-check',  desc: 'Just Pay for Our Qualified Work'},
];
}
