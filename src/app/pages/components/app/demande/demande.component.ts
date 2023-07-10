import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {

    demandes;
    btnC=
        {
            label:'Demande congé',value:'demande-conge',isActive:true
        };
    btnM=  {
            label:'Demande de mission',value:'demande-mission',isActive:false
        };
    btnFP=   {
            label:'Demande de fiche de paie',value:'demande-fiche-paie',isActive:false
        } ;
    btnT=   {
            label:'Demande de travail',value:'demande-travail',isActive:false
        }
    demande:string='Demande congé';
    selectbtnC(){
        this.btnC.isActive=true;
        this.btnM.isActive=false;
        this.btnFP.isActive=false;
        this.btnT.isActive=false;
        this.demande=this.btnC.label;
    }
    selectbtnM(){
        this.btnC.isActive=false;
        this.btnM.isActive=true;
        this.btnFP.isActive=false;
        this.btnT.isActive=false;
        this.demande=this.btnM.label;
    }
    selectbtnFP(){
        this.btnC.isActive=false;
        this.btnM.isActive=false;
        this.btnFP.isActive=true;
        this.btnT.isActive=false;
        this.demande=this.btnFP.label;
    }
    selectbtnT(){
        this.btnC.isActive=false;
        this.btnM.isActive=false;
        this.btnFP.isActive=false;
        this.btnT.isActive=true;
        this.demande=this.btnT.label;
    }
    constructor() { }

    ngOnInit(): void {
        this.demandes=[
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024'},
        ]
    }

}
