import { Component } from '@angular/core';
import { Cbutton1Component } from '../../components/cbutton1/cbutton1.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [Cbutton1Component, ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+1', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }
}
