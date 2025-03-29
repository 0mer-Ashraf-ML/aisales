import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;
  email:string = "";
  otpCode: string = '';
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService,) {
    this.resetPasswordForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );

    this.email = this.route.snapshot.queryParams['email'] || '';
    this.otpCode = this.route.snapshot.queryParams['otpCode'] || '';
  }

  // ✅ Custom Validator for Password Match
  passwordsMatch(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  // ✅ Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.authService.resetPassword(this.email, this.otpCode, this.resetPasswordForm.get('newPassword')?.value).subscribe({
      next: (data) => {
        this.isLoading = false;
        if (data?.success === true) {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }

  // ✅ Getters for form controls
  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }
}
