import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private fb: FormBuilder, private router: Router,private route: ActivatedRoute,private authService: AuthService) {
    this.otpForm = this.fb.group({
      otp: this.fb.array<FormControl>(  // ✅ Explicitly type FormArray<FormControl>
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
  
    // ✅ Update FormArray value manually
    this.otp.controls[index].setValue(value);
    this.otp.markAsDirty(); // Ensure Angular detects changes
  
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

    this.authService.verifyOtp(enteredOtp, this.email,this.otpType == "account_verification" ? "account_verification" : "password_reset").subscribe({
      next: (data) => {
        this.isLoading = false;
        if (data?.success === true) {
          // show toast here "Valid OTP"
          if(this.otpType == "account_verification")
          {
            this.router.navigate(['/login']);
          }
          else{
            this.router.navigate(['/reset-password'], {
              queryParams: {
                email: this.email,
                otpCode: enteredOtp
              }
            });
          }
        }
        else{
          // show toast here "Invalid OTP";
        }
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }

  resendOtp() {
    if (this.canResend) {
      alert('📩 New OTP sent to your email!');
      this.startCountdown();
    }
  }
}
