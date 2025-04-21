import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
})
export class LogInComponent {
  loginForm: FormGroup;
  showPassword = false;
  loginError: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      // email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordPatternValidator,
        ],
      ],
      rememberMe: [false],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  passwordPatternValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.value;
    if (!password) return null;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&'*+\-/=?^_`{|}~.@()\[\]\\:;"',<>])[A-Za-z\d!#$%&'*+\-/=?^_`{|}~.@()\[\]\\:;"',<>]{8,}$/;
    return passwordRegex.test(password) ? null : { invalidPassword: true };
  };

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please fix the errors in the form.', 'Invalid Input');
      return;
    }

    this.isLoading = true;
    this.loginError = null;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.isLoading = false;
        localStorage.setItem('authToken', data.data.accessToken.access_token);
        console.log(data.data);
        localStorage.setItem('userId', data.data.user.id);
        this.toastr.success('Login successful!', 'Welcome');
        this.router.navigate(['/account']);
      },
      error: (error) => {
        this.isLoading = false;
        this.loginError = 'Login failed. Please check your credentials.';
        if (error.error) {
          this.toastr.error(error.error.message, 'Error');
        } else {
          this.toastr.error(error.message, 'Error');
        }
      },
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  benefits: any[] = ['Identifies high-intent prospects in real-time', 'Generates qualified leads from conversations', 'Helps close deals faster'];
}
