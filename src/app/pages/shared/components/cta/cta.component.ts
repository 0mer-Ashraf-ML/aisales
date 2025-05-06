import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TypewriterDirective } from '../../../../directives/typewriter.directive';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, RouterLink, TypewriterDirective],
  templateUrl: './cta.component.html',
  styles: ``
})
export class CtaComponent {
  @Input() heading1: string = '';
  @Input() heading2: string = '';
  @Input() imageUrl: string = '';
  @Input() paragraph1: string = '';
  @Input() paragraph2: string = '';
  @Input() buttonText: string = 'Get Started';
  @Input() isReverseLayout: boolean = true;

  constructor(private router: Router) {}

  @Input() isLoggedIn = false;

  navigate(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/account']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
