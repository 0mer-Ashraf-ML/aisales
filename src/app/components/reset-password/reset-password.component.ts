import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  email: string = "";
  otpCode: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService // Inject ToastrService
  ) {
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
    if (this.resetPasswordForm.invalid) {
      this.toastr.error('❌ Please fill in the required fields correctly.', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
      });
      return;
    }

    this.isLoading = true;
    this.authService.resetPassword(this.email, this.otpCode, this.resetPasswordForm.get('newPassword')?.value)
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          if (data?.success === true) {
            this.toastr.success('✅ Password reset successfully!', 'Success', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
            });

            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Password reset failed:', err);
          this.toastr.error(err.error?.message || '❌ Password reset failed. Try again!', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
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
