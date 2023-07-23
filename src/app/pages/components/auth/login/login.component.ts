import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LayoutService} from 'src/app/config/service/app.layout.service';
import {AuthService} from '../auth.service';
import {ApiJurisService} from "../../../services/api-juris.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
        providers: [ConfirmationService, MessageService]
})
export class LoginComponent implements OnInit{

    signForm: FormGroup;
    registreForm: FormGroup;

    valCheck: string[] = ['remember'];

    password!: string;
    isIncorrectLogin: boolean = false;

    constructor(
        public layoutService: LayoutService,
        public fb: FormBuilder,
        public authService: AuthService,
        private apiJurisService: ApiJurisService,
        public router: Router, private messageService: MessageService) {


    }

    login() {
        this.authService.login(
            this.signForm.value
        );

        if (localStorage.getItem("access-token") == null){
            this.isIncorrectLogin = true;
        }
    }

    save() {
        this.apiJurisService.post('/employe/', this.registreForm.value).subscribe((res) => {

            this.registreForm = this.fb.group({
                username: [null, Validators.required],
                nom: [null, Validators.required],
                prenom: [null, Validators.required],
                email: [null, Validators.required],
                datenaissance: [null, Validators.required],
                cin: [null, Validators.required],
                password: [null, Validators.required],
            });
            this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Employé ajouter avec succée' });

        })
    }


    ngOnInit(): void{

    this.signForm = this.fb.group({
        username: [null, Validators.required],
        password: [null, Validators.required],
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
}
