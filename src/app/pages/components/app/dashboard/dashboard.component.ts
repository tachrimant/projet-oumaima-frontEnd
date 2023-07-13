import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppStore } from 'src/app/pages/services/app-store.service';
import { environment } from 'src/environments/environment';
import {ApiJurisService} from "../../../services/api-juris.service";

const BACKEND_URL = environment.apiUrl ;

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    projects;
    currentUser:any;
    employes = [];
    projets = [];
    constructor(private appStore:AppStore, private service : ApiJurisService) { }

    ngOnInit(): void {
        this.appStore.getUser().subscribe((user)=>{
             this.currentUser=  user
        })
        this.findAllEmploye()
        this.findAllProjets()
    }


    findAllEmploye(){
        this.service.get('/employe/').subscribe(
            data => {
                this.employes = data;
            }
        )
    }
    findAllProjets(){
        this.service.get('/projet/').subscribe(
            data => {

                this.projets = data;
            }
        )
    }

}
