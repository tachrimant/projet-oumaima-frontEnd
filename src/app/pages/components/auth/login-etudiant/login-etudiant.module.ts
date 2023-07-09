import { LoginEtudiantComponent } from './login-etudiant.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { LoginEtudiantRoutingModule } from './login-etudiant-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LoginEtudiantRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule
    ],
    declarations: [LoginEtudiantComponent]
})
export class LoginEtudiantModule { }
