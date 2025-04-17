import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LatestChatService {
  private apiUrl = `https://ai.sellersgpt.com`;
  // private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  getLatestChat(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/user/${localStorage.getItem('userId')}/latest-conversation`
    );
  }
}
