import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService, StoreAuthentication } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private storeAuth: StoreAuthentication
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.storeAuth.getTokenFromLocalStorage();
        if(authToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + authToken
                }
            });
        }

        return next.handle(req);
    }
}
