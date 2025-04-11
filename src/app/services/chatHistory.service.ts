import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { prospects } from "../models/prospects.interface";

@Injectable({
    providedIn: 'root'
})

export class ChatHistoryService {
    private apiUrl = `https://d159-146-190-170-129.ngrok-free.app/user`;
    // private apiUrl = 'http://localhost:4000/api';

    constructor(private http: HttpClient) {}

    
    getChatHistory(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${localStorage.getItem("userId")}/sessions`);
      }
      
      

      getSpecificChatHistory(sessionId:string):Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${localStorage.getItem("authToken")}/${sessionId}`);
      }

  

      
      


}