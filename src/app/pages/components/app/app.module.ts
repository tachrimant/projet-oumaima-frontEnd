import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
 import {CustomHeaderComponent} from "../../@core/components/custom-header/custom-header.component";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ButtonModule} from "primeng/button";
import {NbButtonModule, NbDialogModule, NbIconModule, NbSelectModule} from "@nebular/theme";
import { EmployeeComponent } from './employee/employee.component';
import { ContratComponent } from './contrat/contrat.component';
import { ProjetComponent } from './projet/projet.component';
import { DemandeComponent } from './demande/demande.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RippleModule} from "primeng/ripple";
import {CalendarModule} from "primeng/calendar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import { FormationComponent } from './formation/formation.component';
import { HomeEmployeComponent } from './home-employe/home-employe.component';

@NgModule({
    imports: [NbButtonModule,
        CommonModule,
        AppRoutingModule,
        OverlayPanelModule,
        ButtonModule,
        NbSelectModule,
        NbDialogModule.forChild(), TableModule, InputTextModule, NbIconModule, RippleModule, CalendarModule, ReactiveFormsModule, FormsModule, ConfirmDialogModule, ToastModule,

    ],
    declarations: [

   CustomHeaderComponent,
     EmployeeComponent,
     ContratComponent,
     ProjetComponent,
        DashboardComponent,
     DemandeComponent,
     FormationComponent,
     HomeEmployeComponent
  ],
    exports:[CustomHeaderComponent],

})
export class AppModule {}
