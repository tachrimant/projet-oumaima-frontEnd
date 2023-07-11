import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

    isAdd:boolean=false
    projets;
    tacheFrom: FormGroup;
    constructor(private fb : FormBuilder) {

    }

    ngOnInit(): void {
        this.initForm()
        this.projets=[

            {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },          {cin:'wami',
                nom:'scc',
                prenom:'prenom',
                email:'prenom',
                dateNaissance:'12-06-2023',
         },

        ]
    }

    initForm(){

        this.tacheFrom = this.fb.group(
            {
                cin : [null, Validators.required],
                nom : [null, Validators.required],
                prenom : [null, Validators.required],
                email : [null, Validators.required],
                dateNaissance : [null, Validators.required]
            }
        )
    }

    addElement(){
        this.isAdd=!this.isAdd;
    }
    save(){

    }
}
