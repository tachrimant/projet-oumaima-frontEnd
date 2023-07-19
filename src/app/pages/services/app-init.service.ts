import { HttpClient } from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { environment } from './../../../environments/environment';
import { EMPTY, map } from 'rxjs';
import { AppStore, AppUser } from './app-store.service';
import { StoreAuthentication } from '../components/auth/auth.service';
import { Router } from '@angular/router';
import {ApiJurisService} from "./api-juris.service";
const BACKEND_URL = environment.apiUrl ;

@Injectable({
    providedIn: 'root',
})
export class AppInitService {

    constructor(
        private http: HttpClient,
        private appStore: AppStore,
        public router: Router,
        private storeAuth: StoreAuthentication,
        private service:ApiJurisService
    ) {
    }

    Init() {
        return new Promise<any>((resolve: Function) => {
             const authToken = this.storeAuth.getTokenIsValidFromLocalStorage();
            if(!authToken) {
                this.router.navigate(['/auth/login'])
                return resolve();
            } else {
                console.log('ola ola ola1')
                return this.getconfig(localStorage.getItem('user')).subscribe((user:any)=>{
                    if(user){
                        let roles = [];
                        user.authorities.map(role => {
                            roles.push(role.authority);
                        });
                        let appUser: AppUser = {
                            id: user.id,
                            username: user.username,
                            uuid: user.uuid,
                            authorities: roles
                        }
                        this.appStore.setUser(appUser);
                    }
                })
                //     .subscribe(
                //     (user)=> {
                //
                //             if(user){
                //                 let roles = [];
                //                 user.authorities.map(role => {
                //                     roles.push(role.authority);
                //                 });
                //                 let appUser: AppUser = {
                //                     id: user.id,
                //                     username: user.username,
                //                     uuid: user.uuid,
                //                     authorities: roles
                //                 }
                //                 this.appStore.setUser(appUser);
                //             }
                //
                //     },
                //     (_)=> resolve(),
                //
                // )
            }


            // setTimeout(() => {

            //     resolve();
            // }, 6000);
        });
    }

    getconfig(id) {

        return this.http
            .get("http://localhost:8036/api/users/profile/"+id)

    }
}
