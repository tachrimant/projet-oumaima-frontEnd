import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {AuthGuard} from "../auth/guards/auth.guard";
import {EmployeeComponent} from "./employee/employee.component";
import {ContratComponent} from "./contrat/contrat.component";
import {DemandeComponent} from "./demande/demande.component";
import {ProjetComponent} from "./projet/projet.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: 'dashboard',component:DashboardComponent},
            {path:'employee',component:EmployeeComponent},
            {path:'contrat',component:ContratComponent},
            {path:'projet',component:ProjetComponent},
            {path:'demande',component:DemandeComponent},
            {path: '',redirectTo:'dashboard', pathMatch: 'full'},
        ])
    ]
})
export class AppRoutingModule {}
