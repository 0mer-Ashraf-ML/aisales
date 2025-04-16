import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cbutton1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cbutton1.component.html'
})
export class Cbutton1Component {
  @Input() btnText: string = 'Submit';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
