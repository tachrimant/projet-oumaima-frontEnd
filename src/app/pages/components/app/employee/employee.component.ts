import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiJurisService} from "../../../services/api-juris.service";
import {environment} from "../../../../../environments/environment";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class EmployeeComponent implements OnInit {

    isAdd:boolean=false
    projets;
    tacheFrom: FormGroup;
    empCin: any;
    constructor(private confirmationService: ConfirmationService,private fb : FormBuilder, private service : ApiJurisService, private messageService: MessageService) {

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
                this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Employé ajouter avec succée' });
                this.initForm();

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
    findByCin(value){
        this.service.get('/employe/cin/' + value).subscribe(
            data => {
                this.projets = data;
            }
        )
    }
    deleteById(id){
        this.service.delete('/employe/' ,id).subscribe(
            data => {
                this.projets = data;
                this.messageService.add({ severity: 'info', summary: 'Confirmer', detail: 'Employé supprimer' });
            }
        )
    }

    openDelete(id: number) {
            this.confirmationService.confirm({
                message: 'Voulez vous vraiment supprimer cet employé',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.deleteById(id);
                },
                reject: (type: ConfirmEventType) => {
                    switch (type) {
                        case ConfirmEventType.REJECT:
                            this.messageService.add({ severity: 'error', summary: 'Anuller', detail: 'suppression annuler' });
                            break;

                    }
                }
            });
        }

}
