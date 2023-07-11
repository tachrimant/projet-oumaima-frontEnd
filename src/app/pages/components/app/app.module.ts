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

@NgModule({
    imports: [NbButtonModule,
        CommonModule,
        AppRoutingModule,
        OverlayPanelModule,
        ButtonModule,
        NbSelectModule,
        NbDialogModule.forChild(), TableModule, InputTextModule, NbIconModule, RippleModule, CalendarModule, ReactiveFormsModule, FormsModule,

    ],
    declarations: [

   CustomHeaderComponent,
     EmployeeComponent,
     ContratComponent,
     ProjetComponent,
        DashboardComponent,
     DemandeComponent
  ],
    exports:[CustomHeaderComponent],

})
export class AppModule {}
