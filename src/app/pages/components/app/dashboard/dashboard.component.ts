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