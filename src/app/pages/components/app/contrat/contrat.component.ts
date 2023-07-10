import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {

    projects;
    constructor() { }

    ngOnInit(): void {
        this.projects=[
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
