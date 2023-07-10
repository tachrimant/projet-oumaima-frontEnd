import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptor } from './pages/components/auth/auth-interceptor';
import { AppInitService } from './pages/services/app-init.service';
import { CustomHeaderComponent } from './pages/@core/components/custom-header/custom-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbDialogModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {config} from "rxjs";
import {BrowserModule} from "@angular/platform-browser";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";


export function initializeApp(appInitService: AppInitService) {
    return (): Promise<any> => {
      return appInitService.Init();
    }
}

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        AppLayoutModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot(),
        ReactiveFormsModule,
        NbLayoutModule,
        NbEvaIconsModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true}
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        // CountryService, CustomerService, EventService, IconService, NodeService,
        // PhotoService, ProductService
    ],
    exports: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
