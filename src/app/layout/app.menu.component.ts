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
                    roles: ['ROLE_ADMIN'],
                    visible: false
                } ,
                {
                    label: 'Employée',
                    icon: 'pi pi-fw pi-users',
                    routerLink: ['/employee'],
                    roles: ['ROLE_ADMIN'],
                    visible: false
                },
                {
                    label: 'Contrat',
                    icon: 'pi pi-fw pi-file',
                    routerLink: ['/contrat'],
                    roles: ['ROLE_ADMIN'],
                    visible: false
                },
                {
                    label: 'Projet',
                    icon: 'pi pi-fw pi-inbox',
                    routerLink: ['/projet'],
                    roles: ['ROLE_ADMIN'],
                    visible: false
                },
                {
                    label: 'Demande',
                    icon: 'pi pi-fw pi-copy',
                    routerLink: ['/demande'],
                    roles: ['ROLE_ADMIN'],
                    visible: false
                },
                {
                    label: 'Formation',
                    icon: 'pi pi-fw pi-sitemap',
                    routerLink: ['/formation'],
                    roles: ['ROLE_ADMIN'],
                    visible: false
                }
            ],
            roles: ['ROLE_ADMIN'],
            visible: false
        },
        {
            label: 'Employe',
            items: [
                {
                    label: 'Acceuil',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/MyHome'],
                    roles: ['ROLE_USER'],
                    visible: false
                },
                {
                    label: 'Formation',
                    icon: 'pi pi-fw pi-sitemap',
                    routerLink: ['/formationemploye'],
                    roles: ['ROLE_USER'],
                    visible: false
                },
                {
                    label: 'Mes tâches',
                    icon: 'pi pi-fw pi-microsoft',
                    routerLink: ['/tacheemploye'],
                    roles: ['ROLE_USER'],
                    visible: false
                },
                {
                    label: 'Mes demandes',
                    icon: 'pi pi-fw pi-copy',
                    routerLink: ['/demandeemploye'],
                    roles: ['ROLE_USER'],
                    visible: false
                }
            ],
            roles: ['ROLE_USER'],
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
