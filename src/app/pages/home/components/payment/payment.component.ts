import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cbutton1Component } from "../../../shared/components/cbutton1/cbutton1.component";
import { RouterLink } from '@angular/router';
import { TypewriterDirective } from '../../../../directives/typewriter.directive';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, Cbutton1Component, RouterLink, TypewriterDirective],
  templateUrl: './payment.component.html'
})
export class PaymentComponent {
  
features:any[] = [
  {icon: 'fa-check', desc: 'No Budget of Commitments'},
  {icon: 'fa-check',  desc: 'No Monthly / Annual Software Charge'},
  {icon: 'fa-check',  desc: 'Just Pay for Our Qualified Work'},
];
}
