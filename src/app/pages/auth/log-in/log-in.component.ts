import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
})
export class LogInComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly commonService = inject(CommonService);

  benefits: string[] = [
    'Identifies high-intent prospects in real-time',
    'Generates qualified leads from conversations',
    'Helps close deals faster'
  ];

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please fix the errors in the form');
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.commonService.setToken(data.data.accessToken.access_token);
        this.commonService.setUser(data.data.user);
        this.toastr.success('Login successful');
        this.router.navigate(['/account']);
      },
      error: (error) => {
        this.isLoading = false;
        
        if (error.status === 401) {
          this.toastr.error('Invalid email or password');
        } else if (error.error?.message) {
          this.toastr.error(error.error.message);
        } else {
          this.toastr.error('Login failed. Please try again later');
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  passwordPatternValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.value;
    if (!password) return null;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&'*+\-/=?^_`{|}~.@()\[\]\\:;"',<>])[A-Za-z\d!#$%&'*+\-/=?^_`{|}~.@()\[\]\\:;"',<>]{8,}$/;
    return passwordRegex.test(password) ? null : { invalidPassword: true };
  };

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}