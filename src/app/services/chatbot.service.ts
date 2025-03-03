import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://134.199.142.5:8000';

  constructor(private http: HttpClient) {}

  conservation(params: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/Chat', null , { params });
  }
}
