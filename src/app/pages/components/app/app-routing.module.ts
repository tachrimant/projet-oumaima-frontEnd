import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {AuthGuard} from "../auth/guards/auth.guard";
import {EmployeeComponent} from "./employee/employee.component";
import {ContratComponent} from "./contrat/contrat.component";
import {DemandeComponent} from "./demande/demande.component";
import {ProjetComponent} from "./projet/projet.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FormationComponent} from "./formation/formation.component";
import {HomeEmployeComponent} from "./home-employe/home-employe.component";
import {AdminGuard} from "../auth/guards/admin.guard";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: 'dashboard',component:DashboardComponent},
            {path:'employee',component:EmployeeComponent, canActivate: [AdminGuard] },
            {path:'contrat',component:ContratComponent},
            {path:'projet',component:ProjetComponent},
            {path:'demande',component:DemandeComponent},
            {path:'formation',component:FormationComponent},
            {path:'MyHome',component:HomeEmployeComponent},
            {path: '',redirectTo:'dashboard', pathMatch: 'full'},
        ])
    ]
})
export class AppRoutingModule {}
