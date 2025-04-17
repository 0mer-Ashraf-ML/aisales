import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { prospects } from '../models/prospects.interface';
import { company } from '../models/companies.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'https://api.sellersgpt.com/api';
  // private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  postCompany(data: company): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/companies`, data);
  }

  getCompanies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/companies`);
  }

  updateCompany(id: any, data: company): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/companies/${id}`, data);
  }

  deleteCompany(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/companies/${id}`);
  }
}
