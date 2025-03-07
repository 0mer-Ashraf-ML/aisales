import { Component } from '@angular/core';
import { Cbutton1Component } from '../../components/cbutton1/cbutton1.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [Cbutton1Component, CommonModule],
  templateUrl: './billing.component.html',
})
export class BillingComponent {
  isCardModalVisible: boolean = false;
  isCompanyModalVisible: boolean = false;
  toggleCardModal() {
    console.log('called')
    this.isCardModalVisible = !this.isCardModalVisible;
  }
  toggleCompanyModal() {
    this.isCompanyModalVisible = !this.isCompanyModalVisible;
  }
}