import { AuthGuard } from './pages/components/auth/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { isLoginGuard } from './pages/components/auth/guards/is-login.guard';
import { AppLayoutComponent } from './layout/app.layout.component';
import {RegisterComponent} from "./pages/components/auth/register/register.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'register', component:RegisterComponent },
            { path: 'auth', canActivate: [isLoginGuard], loadChildren: () => import('./pages/components/auth/auth.module').then(m => m.AuthModule) },
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', canActivate: [AuthGuard], loadChildren: () => import('./pages/components/app/app.module').then(m => m.AppModule) },
                ]
            },


            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
