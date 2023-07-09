import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../pages/components/auth/auth.service';
import {filter} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    breadItems: MenuItem[];
    home: MenuItem;
    items: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        public router: Router,
        private auth: AuthService
        ) {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((url) => {
                const array = url['url'].split('/');
                const arrayItems = [];
                array.map((route) => {
                    if(route) {
                        arrayItems.push({label: route});
                    }
                })
                this.breadItems = arrayItems as MenuItem[];

            });
         this.home = {icon: 'pi pi-home'};
        this.items = [
            {
               label:'Profile',
               icon:'pi pi-user',
            },
            {
               label:'Edit',
               icon:'pi pi-fw pi-pencil',
            },
            {
               separator:true
            },
            {
               label:'Sign out',
               icon:'pi pi-fw pi-power-off',
               command:  (event: any) => {
                this.offApp();
               }
            }
        ];
    }
    test(value){
        console.log('olaola==>'+JSON.stringify(value))
    }
    offApp() {
        this.auth.logout();
    }
}
