import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cbutton1Component } from '../cbutton1/cbutton1.component';
import { TypewriterDirective } from '../../directives/typewriter.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, Cbutton1Component, TypewriterDirective],
  templateUrl: './hero.component.html',
})
export class HeroComponent {}
