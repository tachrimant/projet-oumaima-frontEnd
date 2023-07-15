import { HttpClient } from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { environment } from './../../../environments/environment';
import { EMPTY, map } from 'rxjs';
import { AppStore, AppUser } from './app-store.service';
import { StoreAuthentication } from '../components/auth/auth.service';
import { Router } from '@angular/router';
const BACKEND_URL = environment.apiUrl ;

@Injectable({
    providedIn: 'root',
})
export class AppInitService {

    constructor(
        private http: HttpClient,
        private appStore: AppStore,
        public router: Router,
        private storeAuth: StoreAuthentication
    ) {
    }

    Init() {
        return new Promise<any>((resolve: Function) => {
            console.log("AppInitService.init() called");
            const authToken = this.storeAuth.getTokenIsValidFromLocalStorage();
            if(!authToken) {
                this.router.navigate(['/auth/login'])
                return resolve();
            } else {
                return this.getconfig().pipe(map(user => {
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
                })).subscribe(
                    (_)=> {console.log('AppInitService Finished');},
                    (_)=> resolve(),
                    ()=> resolve(),
                )
            }


            // setTimeout(() => {

            //     resolve();
            // }, 6000);
        });
    }

    getconfig() {

        return this.http
            .get<any>(BACKEND_URL + "/api/users/profile")
            // .pipe(map(user => {
            //     if(user){

            //     }
            // }))
            // .subscribe(
            //     (response) => {
            //         this.user = response;
            //     },
            //     error => {
            //         console.log(error);
            //     }
            // );
    }
}
