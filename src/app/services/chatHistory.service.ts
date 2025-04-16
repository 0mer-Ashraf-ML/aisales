import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { prospects } from '../models/prospects.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatHistoryService {
  private apiUrl = `https://ai.baq.ai`;
  // private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  getChatHistory(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/user/${localStorage.getItem('userId')}/sessions`
    );
  }

  getSpecificChatHistory(sessionId: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/conversation/${localStorage.getItem('userId')}/${sessionId}`
    );
  }
}
