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
import {UserGuard} from "../auth/guards/user.guard";
import {DemandeEmployeComponent} from "./demande-employe/demande-employe.component";
import {TacheEmployeComponent} from "./tache-employe/tache-employe.component";
import {FormationEmployeComponent} from "./formation-employe/formation-employe.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: 'dashboard',component:DashboardComponent, canActivate: [AdminGuard]},
            {path:'employee',component:EmployeeComponent, canActivate: [AdminGuard] },
            {path:'contrat',component:ContratComponent, canActivate: [AdminGuard] },
            {path:'projet',component:ProjetComponent, canActivate: [AdminGuard] },
             {path:'demande',component:DemandeComponent, canActivate: [AdminGuard] },
            {path:'formation',component:FormationComponent , canActivate: [AdminGuard]},


            {path:'demandeemploye',component:DemandeEmployeComponent , canActivate: [UserGuard]  },
            {path:'tacheemploye',component:TacheEmployeComponent , canActivate: [UserGuard]  },

            {path:'formationemploye',component:FormationEmployeComponent , canActivate: [UserGuard]},
            {path:'MyHome',component:HomeEmployeComponent , canActivate: [UserGuard]},
            {path: '',redirectTo:'dashboard', pathMatch: 'full'},
        ])
    ]
})
export class AppRoutingModule {}
