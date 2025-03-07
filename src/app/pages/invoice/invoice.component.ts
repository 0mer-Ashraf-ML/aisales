import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent {
  isInvoiceModalVisible: boolean = false;
  isInvoiceExpanded: boolean = false;

  toggleInvoiceModel() {
    this.isInvoiceModalVisible = !this.isInvoiceModalVisible;
  }

  toggleInvoiceExpansion() {
    this.isInvoiceExpanded =!this.isInvoiceExpanded;
  }
}
