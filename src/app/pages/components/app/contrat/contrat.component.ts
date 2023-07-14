import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {ApiJurisService} from "../../../services/api-juris.service";

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss'],
    providers: [ConfirmationService, MessageService]

})
export class ContratComponent implements OnInit {

    contrats;
    employes = [];
    code: string;
    isAdd = false;
    isUpdate = false;
    saveelement = false;
    contratForm: FormGroup;

    constructor(private confirmationService: ConfirmationService,private fb : FormBuilder, private service : ApiJurisService, private messageService: MessageService) {

    }

    addElement(){
        this.isUpdate=false
        this.saveelement = true;
        this.initForm()
        this.isAdd=!this.isAdd;
    }

    initForm(){

        this.contratForm = this.fb.group(
            {
                id : [null],
                dateDebut : [null, Validators.required],
                dateFin : [null],
                libelle : [null, Validators.required],
                employe : [null, Validators.required],
                code : [null, Validators.required],
                typeContrat : [null, Validators.required],
            }
        )
    }

    ngOnInit(): void {
        this.findAllEmploye()
        this.initForm()
        this.findAll();
    }

    findByCode(code: string) {
        if (code.length == 0) this.findAll();
        this.service.get('/contrat/code/' + code).subscribe(
            data => {
                this.contrats = data;
            }
        )
    }

    findAll(){
        this.service.get('/contrat/').subscribe(
            data => {
                this.contrats = data;
            }
        )
    }

    findAllEmploye(){
        this.service.get('/employe/').subscribe(
            data => {
                this.employes = data;
            }
        )
    }

    save(){
        if (this.saveelement){
            this.service.post('/contrat/', this.contratForm.value).subscribe(
                data => {
                    this.contrats = data;
                    this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Contrat ajouter avec succée' });
                    this.initForm();

                }
            )
        }
        else {
            this.service.put('/contrat/', this.contratForm.value).subscribe(
                data => {
                    this.contrats = data;
                    this.saveelement = true;
                    this.isAdd = false;
                    this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Contrat modifier avec succée' });
                    this.initForm();

                }
            )
        }

    }


    deleteById(id){
        this.service.delete('/contrat/' ,id).subscribe(
            data => {
                this.contrats = data;
                this.messageService.add({ severity: 'info', summary: 'Confirmer', detail: 'Contrat supprimer' });
            }
        )
    }

    openDelete(id: number) {
        this.confirmationService.confirm({
            message: 'Voulez vous vraiment supprimer cette contrat',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteById(id);
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Annuller', detail: 'suppression annuler' });
                        break;

                }
            }
        });
    }

    updateElement(contrat) {
        this.isAdd=true
        this.isUpdate=true
        this.saveelement = false;
        const selectedemploye = this.employes.find(employe => employe.id === contrat.employe.id);
        this.contratForm.patchValue({
            id : contrat.id,
            dateDebut : new Date(contrat.dateDebut),
            dateFin :contrat.dateFin? new Date(contrat.dateFin):null,
            libelle : contrat.libelle,
            employe : selectedemploye,
            code : contrat.code,
            typeContrat : contrat.typeContrat,
        })
    }
}
