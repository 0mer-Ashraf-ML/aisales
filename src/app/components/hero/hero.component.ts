import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cbutton1Component } from '../cbutton1/cbutton1.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, Cbutton1Component],
  templateUrl: './hero.component.html',
})
export class HeroComponent {}
