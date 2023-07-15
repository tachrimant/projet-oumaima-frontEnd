import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../auth.service";
import {AppStore} from "../../../services/app-store.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService,private appStore:AppStore, private router: Router) {}

    canActivate(): boolean {

        if (this.authService.isLogged() ) {
            let element;
        this.appStore.getUser().subscribe((res)=>{
            if(res.authorities[0]==='ROLE_ADMIN')
                element= true
            else
            {  element= false


            }


        })
            if (!element)
            {

                this.router.navigate(['/dashboard']);
                return element
            }
            else{
                return element
            }



         } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
