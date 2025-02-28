import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cbutton2',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cbutton2.component.html',
  styleUrl: './cbutton2.component.scss'
})
export class Cbutton2Component {
  @Input() btnText: string = '';
  @Input() routerLink: string = '';
}
