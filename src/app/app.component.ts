import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { StoreAuthentication } from './pages/components/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        private storeAuth: StoreAuthentication,
        private router: Router
    ) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        const authToken = this.storeAuth.getTokenFromLocalStorage();
        if(!authToken) {
            this.router.navigate(['auth/login'])
        } else {

        }
    }
}
