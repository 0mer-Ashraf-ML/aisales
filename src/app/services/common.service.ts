import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, of } from "rxjs";
import { IAppConfig } from "../models/app-config.interface";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    config!: IAppConfig;

    private http = inject(HttpClient);

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    setToken(token: string) {
        localStorage.setItem('authToken', token)
    }

    // getUser(): IUser | null {
    //     const user = localStorage.getItem('authUser');
    //     if (!user) return null;
    //     return JSON.parse(user);
    // }

    // setUser(user: IUser) {
    //     localStorage.setItem('authUser', JSON.stringify(user))
    // }

    isLoggedIn(): boolean {
        console.log("In login Guard")
        if (this.getToken())
        {
            return true
        }
        else{
            return false;
        }
    }

    logout() {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
    }

    public getConfig() {
        return new Promise((resolve, reject) => {
            this.http.get<IAppConfig>('/assets/config.json').pipe(
                catchError(error => {
                    console.error(`Error fetching config`, error);
                    reject(`Error fetching config`);
                    return of();
                })
            ).subscribe(data => {
                this.config = data
                resolve(true);
            });
        })
    }
}