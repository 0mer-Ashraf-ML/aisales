import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate API request delay
    setTimeout(() => {
      const enteredEmail = this.forgotPasswordForm.value.email;

      // Mock backend response
      if (enteredEmail === 'test@example.com') {
        alert('Password reset link sent! Check your email.');
        this.router.navigate(['/login']); // Redirect to login after success
      } else {
        this.errorMessage = 'Email not found. Please try again.';
      }

      this.isLoading = false;
    }, 2000);
  }
}
