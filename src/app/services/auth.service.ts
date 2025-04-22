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

  private tokenKey = 'authToken';
  private userId = 'userId';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.api = this.commonSrv.config.Api;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.api}/auth/login`, { email: email, password })
      .pipe(
        tap((response) => {
          console.log('In login', response);
          localStorage.setItem('userId', response.data.user.id);
          if (response.data.accessToken.access_token) {
            localStorage.setItem(
              this.tokenKey,
              response.data.accessToken.access_token
            );
            localStorage.setItem(
              'stripeId',
              response.data.user.stripe_customer_id
            );
            this.getUserDetails().subscribe();
          }
        })
      );
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

  getUserDetails(): Observable<any> {
    // const token = localStorage.getItem(this.tokenKey);
    // if (!token) return new Observable(); // No token, return empty observable

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });

    console.log('api');

    return this.http.get<any>(`${this.api}/me`).pipe(
      tap((user) => {
        this.userSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userId);
    this.userSubject.next(null);
  }
}
