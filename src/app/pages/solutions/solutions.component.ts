import { Component } from '@angular/core';
import { HeroComponent } from '../shared/components/hero/hero.component';
import { B2bSalesComponent } from './components/b2b-sales/b2b-sales.component';
import { ApplicationsComponent } from '../solutions/components/applications/applications.component';
import { CtaComponent } from '../shared/components/cta/cta.component';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [
    HeroComponent,
    B2bSalesComponent,
    ApplicationsComponent,
    CtaComponent
  ],
  templateUrl: './solutions.component.html',
})
export class SolutionsComponent {}
