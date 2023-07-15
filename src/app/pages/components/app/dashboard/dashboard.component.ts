import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppStore } from 'src/app/pages/services/app-store.service';
import { environment } from 'src/environments/environment';
import {ApiJurisService} from "../../../services/api-juris.service";
import {Router} from "@angular/router";

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
    contrats = [];
    taches = [];
    demadeConge = [];
    demadeMission = [];
    demadeFichePaie = [];
    demande = "Demande congé"
    constructor(private appStore:AppStore, private service : ApiJurisService,private router:Router) { }

    ngOnInit(): void {
        this.appStore.getUser().subscribe((user)=>{
             this.currentUser=  user
        })
        this.findAllEmploye()
        this.findAllProjets()
        this.findAllContrat()
        this.findAlltaches()
        this.findElementTable()
        this.demande =  "Demande de fiche de paie"
        this.findElementTable();
        this.demande =  "Demande de mission"
        this.findElementTable();
    }


    findElementTable() {
        if (this.demande == "Demande congé") {
            this.service.get('/demandeconge/').subscribe(res => {
                this.demadeConge = res
            })
        }

        if (this.demande == "Demande de fiche de paie") {
            this.service.get('/demandedefichedepaie/').subscribe(res => {
                this.demadeFichePaie = res
            })
        }
        if (this.demande == "Demande de mission") {
            this.service.get('/demandemission/').subscribe(res => {
                this.demadeMission = res
            })
        }
    }


    findAlltaches(){
        this.service.get('/tache/').subscribe(
            data => {
                this.taches = data;
            }
        )
    }

    findAllContrat(){
        this.service.get('/contrat/').subscribe(
            data => {
                this.contrats = data;
            }
        )
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

    navToElement(value){
        this.router.navigateByUrl('/'
        +value)
    }
}
