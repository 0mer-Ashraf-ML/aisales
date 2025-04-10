import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.baq.ai/api';
  private tokenKey = 'authToken';
  private userSubject = new BehaviorSubject<any>(null); 
  user$ = this.userSubject.asObservable();
                                                                                                                                                                                                                
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email: email, password }).pipe(
      tap((response) => {
        console.log("In login",response);
        if (response.data.accessToken.access_token) {
          localStorage.setItem(this.tokenKey, response.data.accessToken.access_token);
          localStorage.setItem("stripeId", response.data.user.stripe_customer_id);
          this.getUserDetails().subscribe();
        }
      })
    );
  }

  register(fullname: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, { fullname,email, password });
  }

  verifyOtp(otpCode: string, email: string,type:string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/verify-otp`, { email, otpCode, type });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(email: string, otpCode: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/reset-password`, { email, otpCode, newPassword });
  }

  stripePaymentIntent(amount: number, currency: string, customerId?: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payment/create-payment-intent`, { amount,currency, customerId });
  }

  getUserDetails(): Observable<any> {
    // const token = localStorage.getItem(this.tokenKey);
    // if (!token) return new Observable(); // No token, return empty observable

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });

    console.log('api')

    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      tap((user) => {
        this.userSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }
}