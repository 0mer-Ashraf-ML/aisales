import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { SolutionComponent } from '../../components/solution/solution.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { CallToActionComponent } from "../../components/call-to-action/call-to-action.component";
import { BlogsComponent } from '../../components/blogs/blogs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, FeaturesComponent, SolutionComponent, TestimonialsComponent, BlogsComponent,CallToActionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  title = 'AI Sales';
}
