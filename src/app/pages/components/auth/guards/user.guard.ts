import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";
import {AppStore} from "../../../services/app-store.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
    constructor(private authService: AuthService,private appStore:AppStore, private router: Router) {}

    canActivate(): boolean {

        if (this.authService.isLogged() ) {
            let element;
            this.appStore.getUser().subscribe((res)=>{
                if(res.authorities[0]==='ROLE_USER')
                    element= true
                else
                {
                    this.router.navigate(['/notfound']);
                    element= false
                }


            })
            return element
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
