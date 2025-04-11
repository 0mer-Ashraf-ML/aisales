import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordPatternValidator,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordPatternValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.value;
    if (!password) return null;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&'*+\-/=?^_`{|}~.@()\[\]\\:;"',<>])[A-Za-z\d!#$%&'*+\-/=?^_`{|}~.@()\[\]\\:;"',<>]{8,}$/;
    return passwordRegex.test(password) ? null : { invalidPassword: true };
  };

  passwordMatchValidator: ValidatorFn = (form: AbstractControl) => {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) return null;

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordControl.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
      const { userName, email, password } = this.registerForm.value;
  
      this.authService.register(userName, email, password).subscribe({
        next: (data) => {
          if (data?.success === true) {
            this.toastr.success('Registration successful! Check your email for OTP.', 'Success', {
              timeOut: 3000, // Auto close after 3 seconds
              positionClass: 'toast-top-right',
              progressBar: true,
            });
  
            this.router.navigate(['/otp-verification'], {
              queryParams: {
                otpType: 'account_verification',
                email: data.data.user.email,
              },
            });
          }
        },
        error: (error) => {
          if(error.error){
            this.toastr.error(error.error.message, 'Error');
          }
          else{
            this.toastr.error(error.message, 'Error');
          }
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  
}
