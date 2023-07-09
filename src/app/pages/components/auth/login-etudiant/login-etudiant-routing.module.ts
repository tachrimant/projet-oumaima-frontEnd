import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginEtudiantComponent } from './login-etudiant.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginEtudiantComponent }
    ])],
    exports: [RouterModule]
})
export class LoginEtudiantRoutingModule { }
