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
    formations = [];
    contrats = [];
    taches = [];
    demadeConge = [];
    demadeMission = [];
    demadeFichePaie = [];
    demande = "Demande congé"



  ngOnInit(): void {
      this.appStore.getUser().subscribe((user)=>{
          this.currentUser=  user
      })
      this.findAllEmploye()
      this.findAllformations()
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
            this.service.get('/demandeconge/employe/' + localStorage.getItem('user')).subscribe(res => {
                this.demadeConge = res
            })
        }

        if (this.demande == "Demande de fiche de paie") {
            this.service.get('/demandedefichedepaie/employe/' + localStorage.getItem('user')).subscribe(res => {
                this.demadeFichePaie = res
            })
        }
        if (this.demande == "Demande de mission") {
            this.service.get('/demandemission/employe/' + localStorage.getItem('user')).subscribe(res => {
                this.demadeMission = res
            })
        }
    }


    findAlltaches(){
        this.service.get('/tache/employe/' + localStorage.getItem('user')).subscribe(
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
    findAllformations(){
        this.service.get('/formation/').subscribe(
            data => {

                this.formations = data;
            }
        )
    }

    navToElement(value){
        this.router.navigateByUrl('/'
            +value)
    }

}
