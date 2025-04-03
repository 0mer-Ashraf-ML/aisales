import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './otp.component.html'
})
export class OtpComponent {
  otpForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  countdown = 30;
  canResend = false;
  otpType: string = '';  // Store OTP type
  email: string = '';    // Store email

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService // Inject ToastrService
  ) {
    this.otpForm = this.fb.group({
      otp: this.fb.array<FormControl>(
        Array.from({ length: 5 }, () => this.fb.control('', [
          Validators.required,
          Validators.pattern(/^\d$/)
        ]))
      ),
    });
    this.otpType = this.route.snapshot.queryParams['otpType'] || '';
    this.email = this.route.snapshot.queryParams['email'] || '';
    console.log(this.otpType);

    this.startCountdown();
  }

  get otp(): FormArray<FormControl> {
    return this.otpForm.get('otp') as FormArray<FormControl>;
  }

  startCountdown() {
    this.canResend = false;
    this.countdown = 30;
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.canResend = true;
        clearInterval(interval);
      }
    }, 1000);
  }

  focusNext(index: number, event: any) {
    const value = event.target.value;
    this.otp.controls[index].setValue(value);
    this.otp.markAsDirty();

    if (value && index < 4) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  focusPrev(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && index > 0 && !this.otp.controls[index].value) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }
  }

  onSubmit() {
    if (this.otpForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    const enteredOtp = this.otp.value.join('');

    this.authService.verifyOtp(enteredOtp, this.email, this.otpType === "account_verification" ? "account_verification" : "password_reset")
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          if (data?.success === true) {
            this.toastr.success('✅ OTP Verified Successfully!', 'Success', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
              progressBar: true,
            });

            if (this.otpType === "account_verification") {
              this.router.navigate(['/login']);
            } else {
              this.router.navigate(['/reset-password'], {
                queryParams: {
                  email: this.email,
                  otpCode: enteredOtp
                }
              });
            }
          } else {
            this.toastr.error('❌ Invalid OTP. Please try again.', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
              progressBar: true,
            });
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('OTP verification failed:', err);
          this.toastr.error(err.error?.message || 'OTP verification failed. Try again!', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
        }
      });
  }

  resendOtp() {
    if (this.canResend) {
      this.toastr.info('📩 New OTP sent to your email!', 'Info', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
      });
      this.startCountdown();
    }
  }
}