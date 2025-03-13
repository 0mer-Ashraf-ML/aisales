import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cbutton1',
  standalone: true,
  imports: [],
  templateUrl: './cbutton1.component.html'
})
export class Cbutton1Component {
  @Input() btnText: string = 'Submit';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
}
