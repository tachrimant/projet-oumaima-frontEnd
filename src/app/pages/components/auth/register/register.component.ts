import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
      this.init()
  }
init(){
    this.registerForm = this.fb.group({
        username: [''],
        email: [''],
        nom: [''],
        prenom: [''],
        phone: [''],
        password: [''],
    });
}
save(){}
}
