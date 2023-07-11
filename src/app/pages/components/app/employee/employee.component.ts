import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiJurisService} from "../../../services/api-juris.service";
import {environment} from "../../../../../environments/environment";
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

    isAdd:boolean=false
    projets;
    tacheFrom: FormGroup;
    empCin: any;
    constructor(private fb : FormBuilder, private service : ApiJurisService) {

    }

    ngOnInit(): void {
        this.initForm();
        this.findAll();
    }

    initForm(){

        this.tacheFrom = this.fb.group(
            {
                cin : [null, Validators.required],
                nom : [null, Validators.required],
                prenom : [null, Validators.required],
                email : [null, Validators.required],
                datenaissance : [null, Validators.required]
            }
        )
    }

    addElement(){
        this.isAdd=!this.isAdd;
    }
    save(){
        this.service.post('/employe/', this.tacheFrom.value).subscribe(
            data => {
                this.projets = data;
            }
        )
    }

    findAll(){
        this.service.get('/employe/').subscribe(
            data => {
                this.projets = data;
            }
        )
    }
    findByCin(event){
        this.service.get('/employe/cin/' + event.key).subscribe(
            data => {
                this.projets = data;
            }
        )
    }
}
