import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
})
export class ClientsComponent {
  clients: any[] = [
    './images/clients/alibaba.png',
    './images/clients/stp.png',
    './images/clients/haier.png',
    './images/clients/topease.jpeg',
    './images/clients/optraffic.png',
    './images/clients/holley.png',
    './images/clients/midea.png',
    './images/clients/yext.png',
    './images/clients/meorient.png',
    './images/clients/zeekr.png',
    './images/clients/yiwu.jpeg',
    './images/clients/luthai-textile.jpg',
    // './images/clients/lian-lian-global.png',
  ];
}
