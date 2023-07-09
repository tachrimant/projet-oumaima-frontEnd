import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
const BACKEND_URL = environment.apiUrl ;

@Injectable({
    providedIn: 'root'
})
export class ApiService {
constructor(
    private http: HttpClient
) {}

get(url: string) {
    return this.http.get(BACKEND_URL + url) ;
}
post(url: string, body: string) {
    return this.http.post(BACKEND_URL + url, body) ;
}
delete(url) {
    return this.delete(BACKEND_URL + url) ;
}
put(url, body) {
    return this.http.put(BACKEND_URL + url, body) ;
}
}
