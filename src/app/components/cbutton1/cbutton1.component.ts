import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cbutton1',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cbutton1.component.html'
})
export class Cbutton1Component {
  @Input() btnText: string = '';
  @Input() routerLink: string = '';
}
