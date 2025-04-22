import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private commonSrv = inject(CommonService);
  private api = '';

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.api = this.commonSrv.config.Api;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.api}/auth/login`, { email: email, password })
  }

  register(fullname: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.api}/auth/register`, {
      fullname,
      email,
      password,
    });
  }

  verifyOtp(otpCode: string, email: string, type: string): Observable<any> {
    return this.http.post<any>(`${this.api}/auth/verify-otp`, {
      email,
      otpCode,
      type,
    });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.api}/auth/forgot-password`, {
      email,
    });
  }

  resetPassword(
    email: string,
    otpCode: string,
    newPassword: string
  ): Observable<any> {
    return this.http.post<any>(`${this.api}/auth/reset-password`, {
      email,
      otpCode,
      newPassword,
    });
  }

  stripePaymentIntent(
    amount: number,
    currency: string,
    customerId?: string
  ): Observable<any> {
    return this.http.post<any>(`${this.api}/payment/create-payment-intent`, {
      amount,
      currency,
      customerId,
    });
  }
}
