import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {MenuInitService} from '../pages/services/auth/menu-init.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    menu = [
        {
            label: 'Responsable',
            items: [
                {
                    label: 'Acceuil',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/dashboard'],
                    roles: ['ALL'],
                    visible: false
                } ,
                {
                    label: 'Employée',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/employee'],
                    roles: ['ALL'],
                    visible: false
                },
                {
                    label: 'Contrat',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/contrat'],
                    roles: ['ALL'],
                    visible: false
                },
                {
                    label: 'Projet',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/projet'],
                    roles: ['ALL'],
                    visible: false
                },
                {
                    label: 'Demande',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/demande'],
                    roles: ['ALL'],
                    visible: false
                }
            ],
            roles: ['ALL'],
            visible: false
        },


    ];

    constructor(
        public layoutService: LayoutService,
        private menuInitService: MenuInitService
    ) {
    }

    ngOnInit() {
        this.model = this.menuInitService.initMenu(this.menu);
    }
}
