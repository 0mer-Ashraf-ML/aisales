import { Component } from '@angular/core';
import { Cbutton1Component } from '../shared/components/cbutton1/cbutton1.component';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [Cbutton1Component, CommonModule, ReactiveFormsModule],
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

  companyForm: FormGroup;
  cardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize Company Form
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    });

    // Initialize Credit Card Form
    this.cardForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],

      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', Validators.required],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.companyForm.valid) {
      console.log('Form Submitted', this.companyForm.value);
    } else {
      console.log('Form is invalid');
      this.companyForm.markAllAsTouched();
    }
  }

  submitCardForm(event: Event) {
    event.preventDefault();
    if (this.cardForm.valid) {
      console.log('Credit Card Added', this.cardForm.value);
    } else {
      console.log('Credit Card Form is invalid');
      this.cardForm.markAllAsTouched();
    }
  }
}