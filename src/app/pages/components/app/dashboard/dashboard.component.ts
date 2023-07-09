import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppStore } from 'src/app/pages/services/app-store.service';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl ;

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    items: MenuItem[];
    user: any;

    constructor(
        private appStore: AppStore,
        ){

        }

    ngOnInit(): void {
        this.items = [
            {
            label: 'Gestion des personnels',
            items: [
                {
                    label: 'Etudiants',
                    icon:'pi pi-fw pi-plus',
                },
                {
                    label: 'Professeurs',
                    icon:'pi pi-fw pi-trash'
                },
                {
                    label: 'Salaries',
                    icon:'pi pi-fw pi-external-link'
                }
            ]
            },
            {
            label: 'Gestion des paiements',
            items: [
                {
                    label: 'Factures',
                    icon:'pi pi-fw pi-align-left'
                },
            ]
            },
            {
            label: 'Gestion des Cours',
            items: [
                {
                    label: 'Niveaux scolaires',
                    icon:'pi pi-fw pi-user-plus',

                },
                {
                    label: 'Matières',
                    icon:'pi pi-fw pi-user-minus',
                },
            ]
            },
        ]
        this.appStore.getUser().subscribe(user => {
            console.log(user);
        })
    }

}
