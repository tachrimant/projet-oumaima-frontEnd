import { Component, OnInit } from '@angular/core';
import {AppStore} from "../../../services/app-store.service";
import {ApiJurisService} from "../../../services/api-juris.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-employe',
  templateUrl: './home-employe.component.html',
  styleUrls: ['./home-employe.component.scss']
})
export class HomeEmployeComponent implements OnInit {

  constructor(private appStore:AppStore, private service : ApiJurisService,private router:Router) { }

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



  ngOnInit(): void {
      this.appStore.getUser().subscribe((user)=>{
          console.log(user)
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
