import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiJurisService} from "../../../services/api-juris.service";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss'],
    providers: [ConfirmationService, MessageService]

})
export class ProjetComponent implements OnInit {
isAdd:boolean=false
    tacheFrom: FormGroup;
    constructor(private confirmationService: ConfirmationService,private fb : FormBuilder, private service : ApiJurisService, private messageService: MessageService) {

    }

    employes = [];
    projets = [];
    taches = [];

    ngOnInit(): void {
        this.findAllEmploye()
        this.initForm()
        this.findAllProjets();
        this.findAll();
    }


    findAllEmploye(){
        this.service.get('/employe/').subscribe(
            data => {
                this.employes = data;
            }
        )
    }
    findAllProjets(){
        this.service.get('/projet/').subscribe(
            data => {
                this.projets = data;
            }
        )
    }

    findAll(){
        this.service.get('/tache/').subscribe(
            data => {
                this.taches = data;
            }
        )
    }


    initForm(){

        this.tacheFrom = this.fb.group(
            {
                dateDebut : [null, Validators.required],
                dateFin : [null, Validators.required],
                libelle : [null, Validators.required],
                employe : [null, Validators.required],
                projet : [null, Validators.required]
            }
        )
    }

    addElement(){
        this.isAdd=!this.isAdd;
    }

    save(){
        this.service.post('/tache/', this.tacheFrom.value).subscribe(
            data => {
                this.taches = data;
                this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Projet ajouter avec succée' });
                this.initForm();

            }
        )
    }

    deleteById(id){
        this.service.delete('/tache/' ,id).subscribe(
            data => {
                this.taches = data;
                this.messageService.add({ severity: 'info', summary: 'Confirmer', detail: 'Tâche supprimer' });
            }
        )
    }

    openDelete(id: number) {
        this.confirmationService.confirm({
            message: 'Voulez vous vraiment supprimer cette tache',
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
}
