import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/config/service/app.layout.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    signForm: FormGroup;

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        public fb: FormBuilder,
        public authService: AuthService,
        public router: Router
    ) {
        this.signForm = this.fb.group({
            username: [''],
            password: [''],
        });
    }

    login() {
        this.authService.login(
            this.signForm.value
        );
    }
}
