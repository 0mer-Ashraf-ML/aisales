import { Component } from '@angular/core';
import { Cbutton1Component } from '../cbutton1/cbutton1.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TypewriterDirective } from '../../directives/typewriter.directive';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [CommonModule ,Cbutton1Component, RouterLink, TypewriterDirective],
  templateUrl: './call-to-action.component.html'
})
export class CallToActionComponent {
  isLoggedIn = false;
    
      constructor(
        private router: Router,
        private commonSrv: CommonService
      ) {}
    
      ngOnInit() {
        this.isLoggedIn = this.commonSrv.isLoggedIn();
      }
    
      navigateToDashboardOrRegister(): void {
        if (this.isLoggedIn) {
          this.router.navigate(['/account']);
        } else {
          this.router.navigate(['/register']);
        }
      }
      
  experts:any[] = [
    { src: './images/avatars/avatar.webp', alt: 'member photo', size: 'h-8 w-8' },
    { src: './images/avatars/avatar-2.webp', alt: 'member photo', size: 'h-12 w-12' },
    { src: './images/avatars/avatar-3.webp', alt: 'member photo', size: 'h-16 w-16 z-10' },
    { src: './images/avatars/avatar-4.webp', alt: 'member photo', size: 'h-12 w-12 relative' },
    { src: './images/avatars/avatar-1.webp', alt: 'member photo', size: 'h-8 w-8' }
  ];
}
