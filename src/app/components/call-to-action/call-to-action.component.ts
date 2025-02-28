import { Component } from '@angular/core';
import { Cbutton1Component } from '../cbutton1/cbutton1.component';
import { Cbutton2Component } from '../cbutton2/cbutton2.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [CommonModule ,Cbutton1Component, Cbutton2Component],
  templateUrl: './call-to-action.component.html',
  styleUrl: './call-to-action.component.scss'
})
export class CallToActionComponent {
  experts:any[] = [
    { src: './images/avatars/avatar.webp', alt: 'member photo', size: 'h-8 w-8' },
    { src: './images/avatars/avatar-2.webp', alt: 'member photo', size: 'h-12 w-12' },
    { src: './images/avatars/avatar-3.webp', alt: 'member photo', size: 'h-16 w-16 z-10' },
    { src: './images/avatars/avatar-4.webp', alt: 'member photo', size: 'h-12 w-12 relative' },
    { src: './images/avatars/avatar-1.webp', alt: 'member photo', size: 'h-8 w-8' }
  ];
}
