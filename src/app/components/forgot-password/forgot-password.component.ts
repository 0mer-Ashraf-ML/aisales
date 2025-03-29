import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
      this.authService.forgotPassword(enteredEmail).subscribe({
        next: (data) => {
          this.isLoading = false;
          if (data?.success === true) {
            this.router.navigate(['/otp-verification']
              , {
              queryParams: {
                otpType: 'password_reset',
                email: enteredEmail 
              }
            }
          );
          }
        },
        error: (err) => {
          console.error('Registration failed:', err);
        }
      });

      this.isLoading = false;
    }, 2000);
  }
}
