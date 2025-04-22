import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ChatHistoryService {
  private commonSrv = inject(CommonService);
  private ai = '';

  constructor(private http: HttpClient) {
    this.ai = this.commonSrv.config.Ai;
  }

  getChatHistory(): Observable<any> {
    return this.http.get<any>(
      `${this.ai}/user/${localStorage.getItem('userId')}/sessions`
    );
  }

  getSpecificChatHistory(sessionId: string): Observable<any> {
    return this.http.get<any>(
      `${this.ai}/conversation/${localStorage.getItem('userId')}/${sessionId}`
    );
  }
}
