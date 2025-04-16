import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './client.component.scss',
})
export class ClientsComponent {
  row1 = [
    './images/clients/alibaba.png',
    './images/clients/stp.png',
    './images/clients/haier.png',
    './images/clients/topease.jpeg',
    './images/clients/optraffic.png',
    './images/clients/holley.png',
    './images/clients/midea.png',
  ];

  row2 = [
    './images/clients/yext.png',
    './images/clients/meorient.png',
    './images/clients/zeekr.png',
    './images/clients/yiwu.jpeg',
    './images/clients/luthai-textile.jpg',
    './images/clients/lian-lian-global.png',
  ];

  getDelay(index: number, total: number): string {
    return `calc(30s / ${total} * (${total} - ${index + 1}) * -1)`;
  }

  getOffset(index: number, total: number): string {
    return `max(calc(200px * ${total}), 100%)`;
  }
}
