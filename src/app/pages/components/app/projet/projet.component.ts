import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
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
