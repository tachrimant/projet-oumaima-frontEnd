import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { convertToFormData } from "./form-data";
import { AppInitService } from "../../services/app-init.service";
import { AppStore, AppUser } from "../../services/app-store.service";

const BACKEND_URL = environment.apiUrl ;

@Injectable({ providedIn: "root" })
export class AuthService {
    public isAuthenticated: boolean = false;
    private access_token: string;
    private refresh_token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private appInitService: AppInitService,
        private appStore: AppStore
    ) { }

    login(form:any) {
        // const authData = { username: username, password: password };
        // const authFormData = convertToFormData(authData);
        this.http
            .post<any>(
                BACKEND_URL + "/login",
                form
            )
            .subscribe(
                response => {
                     this.access_token = response['access_token'];
                    // this.refresh_token = response['refresh_token'];
                    const expires_in = response['expires_in'];
                    if (this.access_token) {
                        this.setAuthTimer(expires_in);
                        this.isAuthenticated = true;
                        this.authStatusListener.next(true);
                        const now = new Date();
                        const expirationDate = new Date(
                            now.getTime() + expires_in
                        );
                        this.saveAuthData(this.access_token, this.refresh_token, expirationDate);
                         this.router.navigate(["/dashboard"]);
                    }
                    this.appInitService.getconfig().pipe(map(user => {
                        if(user){
                            let roles = [];
                            user.roles.map(role => {
                                roles.push(role.name);
                            });
                            let appUser: AppUser = {
                                id: user.id,
                                username: user.username,
                                uuid: user.uuid,
                                roles: roles
                            }
                            this.appStore.setUser(appUser);
                            this.router.navigate(["/dashboard"]);
                        }
                    })).subscribe();
                },
                error => {
                    this.authStatusListener.next(false);
                }
            );
    }
    getToken() {
        return this.access_token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }
    getRefreshToken() {
        return this.refresh_token;
      }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    // createUser(username: string, email: string, password: string, phone: string) {
    //     const authData: User = { username: username, email: email, password: password, phone: phone };
    //     this.http.post(BACKEND_URL + "/signup", authData).subscribe(
    //         () => {
    //             this.router.navigate(["/"]);
    //         },
    //         error => {
    //             this.authStatusListener.next(false);
    //         }
    //     );
    // }


    public isLogged(): boolean {
        const access_token = localStorage.getItem("access_token");
        const expirationDate = localStorage.getItem("expiration");
        if(!access_token) {
            return false ;
        } else {
            const now = new Date();
            const expiresIn = new Date(expirationDate).getTime() - now.getTime();
            if (expiresIn > 0) {
                return true ;
            } else {
                return false ;
            }
        }


    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.access_token = authInformation.access_token;
            this.isAuthenticated = true;
            this.refresh_token = authInformation.refresh_token;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.access_token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.refresh_token = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["auth/login"]);
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(access_token: string, refresh_token: string, expirationDate: Date) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("refresh_token", refresh_token);
    }

    private clearAuthData() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("refresh_token");
    }

    private getAuthData() {
        const access_token = localStorage.getItem("access_token");
        const expirationDate = localStorage.getItem("expiration");
        const refresh_token = localStorage.getItem("refresh_token");
        if (!access_token || !expirationDate) {
            return null;
        }
        return {
            access_token: access_token,
            expirationDate: new Date(expirationDate),
            refresh_token: refresh_token
        };
    }
}

@Injectable({ providedIn: "root" })
export class StoreAuthentication {

    private isAuthenticatedOrRefresh$ = new BehaviorSubject<boolean>(false);
    setIsAuthenticatedOrRefresh(value: boolean) {
        this.isAuthenticatedOrRefresh$.next(value);
    }
    getIsAuthenticatedOrRefresh() {
        return this.isAuthenticatedOrRefresh$.asObservable();
    }

    private accessToken$ = new BehaviorSubject<string>(null);
    setAccessToken(value: string) {
        this.accessToken$.next(value);
    }
    getAccessToken() {
        return this.accessToken$.asObservable();
    }

    private refreshToken$ = new BehaviorSubject<string>(null);
    setRefreshToken(value: string) {
        this.refreshToken$.next(value);
    }
    getRefreshToken() {
        return this.accessToken$.asObservable();
    }

    private tokenTimer$ = new BehaviorSubject<any>(null);
    setTokenTimer(value: any) {
        this.tokenTimer$.next(value);
    }
    getTokenTimer() {
        return this.tokenTimer$.asObservable();
    }

    getTokenIsValidFromLocalStorage(): boolean {
        let token = localStorage.getItem("access_token");
        if(token) {
            let expiresDate = localStorage.getItem("expiration");
            if(expiresDate) {
                const expiresIn = new Date(localStorage.getItem("expiration")).getTime() - new Date().getTime();
                if(expiresIn > 0) {
                    return true;
                } else {
                    this.removeAuthData();
                    return false;
                }
            } else {
                this.removeAuthData();
                return false;
            }
        } else {
            this.removeAuthData();
            return false;
        }

    }
    removeAuthData() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("refresh_token");
    }
    getTokenFromLocalStorage(): string | null {
        return localStorage.getItem("access_token");
    }
    getRefreshTokenFromLocalStorage(): string | null  {
        return localStorage.getItem("refresh_token");
    }
    getExpirationFromLocalStorage() {
        return localStorage.getItem("expiration");
    }
}

export interface User {
    username: string;
    email: string;
    password: string;
    phone: string;
}