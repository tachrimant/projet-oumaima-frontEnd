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
    currentUser:any;
    constructor(private appStore:AppStore) { }

    ngOnInit(): void {
this.appStore.getUser().subscribe((user)=>{

    this.currentUser=  user
})
    }

}
