import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  // private commonSrv = inject(CommonService);
  private api = 'https://134.199.142.5:8000/Chat';

  constructor(private http: HttpClient) {
    // this.api = this.commonSrv.config.Api + '/Chat';
  }

  conservation(params: any): Observable<any> {
    return this.http.post<any>(this.api, null , { params });
  }
}
