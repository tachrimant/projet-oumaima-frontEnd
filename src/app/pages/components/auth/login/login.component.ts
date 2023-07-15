import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LayoutService} from 'src/app/config/service/app.layout.service';
import {AuthService} from '../auth.service';
import {ApiJurisService} from "../../../services/api-juris.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    signForm: FormGroup;
    registreForm: FormGroup;

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        public fb: FormBuilder,
        public authService: AuthService,
        private apiJurisService: ApiJurisService,
        public router: Router
    ) {
        this.signForm = this.fb.group({
            username: [''],
            password: [''],
        });
        this.registreForm = this.fb.group({
            username: [null, Validators.required],
            nom: [null, Validators.required],
            prenom: [null, Validators.required],
            email: [null, Validators.required],
            datenaissance: [null, Validators.required],
            cin: [null, Validators.required],
            password: [null, Validators.required],
        })
    }

    login() {
        this.authService.login(
            this.signForm.value
        );
    }

    save() {
        this.apiJurisService.post('/employe/', this.registreForm.value).subscribe((res) => {
console.log('cooooool')
        })
    }
}
