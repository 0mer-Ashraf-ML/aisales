import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TypewriterDirective } from '../../../../directives/typewriter.directive';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, TypewriterDirective],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  row1 = [
    'home/clients/alibaba.png',
    'home/clients/stp.png',
    'home/clients/haier.png',
    'home/clients/topease.jpeg',
    'home/clients/optraffic.png',
    'home/clients/holley.png',
    'home/clients/midea.png',
  ];

  row2 = [
    'home/clients/yext.png',
    'home/clients/meorient.png',
    'home/clients/zeekr.png',
    'home/clients/yiwu.jpeg',
    'home/clients/luthai-textile.jpg',
    'home/clients/lian-lian-global.png',
  ];

  getDelay(index: number, total: number): string {
    return `calc(30s / ${total} * (${total} - ${index + 1}) * -1)`;
  }

  getOffset(index: number, total: number): string {
    return `max(calc(120px * ${total}), 100%)`; // Changed from 200px to 120px
  }
}
