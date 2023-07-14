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
    isUpdate:boolean=false
isAdd:boolean=false
    tacheFrom: FormGroup;
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
        this.service.get('/tache/').subscribe(
            data => {
                this.taches = data;
            }
        )
    }


    initForm(){

        this.tacheFrom = this.fb.group(
            {
                id : [null],
                dateDebut : [null, Validators.required],
                dateFin : [null, Validators.required],
                libelle : [null, Validators.required],
                employe : [null, Validators.required],
                projet : [null, Validators.required]
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
            this.service.post('/tache/', this.tacheFrom.value).subscribe(
                data => {
                    this.taches = data;
                    this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Projet ajouter avec succée' });
                    this.initForm();

                }
            )
        }
     else {
            this.service.put('/tache/', this.tacheFrom.value).subscribe(
                data => {
                    this.taches = data;
                    this.saveelement = true;
                    this.isAdd = false;
                    this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Projet ajouter avec succée' });
                    this.initForm();

                }
            )
        }

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

    updateElement(tache) {
        this.isAdd=true
        this.isUpdate=true
        this.saveelement = false;
        const selectedProjet = this.projets.find(projet => projet.id === tache.projet.id);
        const selectedemploye = this.employes.find(employe => employe.id === tache.employe.id);
        this.tacheFrom.patchValue({
            id : tache.id,
            dateDebut : new Date(tache.dateDebut),
            dateFin : new Date(tache.dateFin),
            libelle : tache.libelle,
            employe : selectedemploye,
            projet :selectedProjet,
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
