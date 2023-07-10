import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
isAdd:boolean=false
    projets;

    constructor() { }

    ngOnInit(): void {
        this.projets=[
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},

        ]
    }
    addElement(){
        this.isAdd=!this.isAdd;
    }
}
