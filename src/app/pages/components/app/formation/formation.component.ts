import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {ApiJurisService} from "../../../services/api-juris.service";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss'],
    providers: [ConfirmationService, MessageService]

})
export class FormationComponent implements OnInit {
    isUpdate:boolean=false
    isAdd:boolean=false
    formationFrom: FormGroup;
    private saveelement = true;
    constructor(private confirmationService: ConfirmationService,private fb : FormBuilder, private service : ApiJurisService, private messageService: MessageService) {

    }

    employes = [];
    projets = [];
    taches = [];
    libelle: string;

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
        this.service.get('/formation/').subscribe(
            data => {
                this.taches = data;
            }
        )
    }


    initForm(){

        this.formationFrom = this.fb.group(
            {
                id : [null],
                dateDebut : [null, Validators.required],
                dateFin : [null, Validators.required],
                code : [null, Validators.required],
                description : [null, Validators.required],
                title : [null, Validators.required]
            }
        )
    }

    addElement(){
        this.isUpdate=false
        this.saveelement = true;
        this.initForm()
        this.isAdd=!this.isAdd;
    }

    save(){
        if (this.saveelement){
            this.service.post('/formation/', this.formationFrom.value).subscribe(
                data => {
               this.findAll()
                    this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'formation ajouter avec succée' });
                    this.initForm();

                }
            )
        }
        else {
            this.service.put('/formation/', this.formationFrom.value).subscribe(
                data => {
                    this.findAll()
                    this.saveelement = true;
                    this.isAdd = false;
                    this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'formation modifie avec succée' });
                    this.initForm();

                }
            )
        }

    }

    deleteById(id){
        this.service.delete('/formation/' ,id).subscribe(
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

    updateElement(formation) {
        this.isAdd=true
        this.isUpdate=true
        this.saveelement = false;

        this.formationFrom.patchValue({
            id : formation.id,
            dateDebut : new Date(formation.dateDebut),
            dateFin : new Date(formation.dateFin),
            title : formation.title,
            description : formation.description,
            code :formation.code,
        })
    }

    finByprojetLibelle(libelle: string) {
        this.service.get('/tache/code/' + libelle).subscribe(
            data => {
                this.taches = data;
            }
        )
    }
}
