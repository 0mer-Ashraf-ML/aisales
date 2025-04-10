import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { prospects } from "../models/prospects.interface";

@Injectable({
    providedIn: 'root'
})

export class ProspectsService {
    private apiUrl = 'http://localhost:4000/api';

    constructor(private http: HttpClient) {}

     uploadProspects(data: prospects[]):Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/prospects`, data);
      }
    
      getProspects(id:string):Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/prospects?company_id=${id}`);
      }

      updateProspects(id: any, data: prospects):Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/prospects/${id}`, data);
      }

      deleteProspects(id: any):Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/prospects/${id}`);
      }

      


}