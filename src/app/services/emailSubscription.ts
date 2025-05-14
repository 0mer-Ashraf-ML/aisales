import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class EmailSubscriptionService {
  private api = '';
  private commonSrv = inject(CommonService);

  constructor(private http: HttpClient) {
    this.api = this.commonSrv.config.Api;
  }

  postEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.api}/emailsubscription`, { email });
  }
}
