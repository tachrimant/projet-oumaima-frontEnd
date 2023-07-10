import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

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
