import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private commonSrv = inject(CommonService);
  private api = '';
  private apiUrl = 'https://api.baq.ai/api';
  // private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {
    this.api = this.commonSrv.config.Api + '/chat';
  }

  conservation(params: any): Observable<any> {
    return this.http.post<any>(this.api, null , { params });
  }

  uploadProspects(data: any):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/propects/upload`, data);
  }

  getProspects(data: any):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/propects/getprospects`, data);
  }
}
