import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
const backend_url = environment.apiUrl ;
@Injectable({
  providedIn: 'root'
})
export class ApiJurisService {

  constructor(private http:HttpClient) { }

    public get(api:string):Observable<any>{
      const  accessToken = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
        return this.http.get<any>(backend_url+api,{headers});
    }

    public post(api:string,body:any):Observable<any>{
        const  accessToken = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
        return this.http.post<any>(backend_url+api,body);
    }

    public put(api:string,body:any):Observable<any>{
        const  accessToken = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
        return this.http.put<any>(backend_url+api,body);
    }

    public delete(api:string,value:any):Observable<any>{
        const  accessToken = localStorage.getItem('access_token');
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
        return this.http.delete<any>(backend_url+api + value);
    }

}
