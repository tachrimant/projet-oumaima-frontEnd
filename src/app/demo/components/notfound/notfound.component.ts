import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent {
    constructor(private router:Router) {
    }
    navto(){
        if(  localStorage.getItem("role")==="ROLE_ADMIN"){
            this.router.navigateByUrl("/dashboard")

        }else {

            this.router.navigateByUrl("/MyHome")

        }
    }
}
