import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RegisterComponent} from "./register/register.component";

@NgModule({
    imports: [RouterModule.forChild([

        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
         { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
