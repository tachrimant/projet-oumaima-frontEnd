import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {ApiJurisService} from "../../../services/api-juris.service";

@Component({
  selector: 'app-formation-employe',
  templateUrl: './formation-employe.component.html',
  styleUrls: ['./formation-employe.component.scss'],
    providers: [ConfirmationService, MessageService]

})
export class FormationEmployeComponent implements OnInit {

     demandeCongeFrom: FormGroup;
    demandemissionFrom: FormGroup;
    demandeficheFrom: FormGroup;
    inscription: FormGroup;
    formationEmFrom: FormGroup;
    isAdd: boolean = false
    isUpdate: boolean = false
    employes=[]
    saveelemnt = true;
    initConge() {
        this.demandeCongeFrom = this.fb.group({
            id : [null],
            employee: [null, Validators.required],
            dateFin: [null, Validators.required],
            dateDebut: [null, Validators.required],
            code: [null, Validators.required],
            libelle: [null, Validators.required],
            etat: [null, Validators.required],
            jourCouvrable: [null, Validators.required],
        })
    }

    showAdd() {
        this.isUpdate=false
        this.saveelemnt = true;
        if (this.demande == "Liste des formations") {
            this.initConge()
        }

        if (this.demande == "Mes formations") {
            this.initfiche()
        }

        this.isAdd = !this.isAdd
    }

    initmission() {
        this.demandemissionFrom = this.fb.group({
            id: [null],
            employee: [null, Validators.required],
            dateFin: [null, Validators.required],
            dateDebut: [null, Validators.required],
            code: [null, Validators.required],
            libelle: [null, Validators.required],
            etat: [null, Validators.required],
        })
    }
    initin(){
        this.inscription = this.fb.group({

            employe: [null, Validators.required],
            formation: [null, Validators.required],

        })
    }

    save(){
        if (this.saveelemnt){
            if (this.demande == "Liste des formations") {

                this.service.post('/demandeconge/', this.demandeCongeFrom.value).subscribe(
                    data => {
                        this.demandeConge = data;
                        this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Liste des formations ajouter avec succée' });
                        this.initConge();
                    })
            }

            if (this.demande == "Mes formations") {

                this.service.post('/demandedefichedepaie/', this.demandeficheFrom.value).subscribe(
                    data => {
                        this.demandeFichePaie = data;
                        this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande fiche de paie ajouter avec succée' });
                        this.initfiche();

                    })
            }
        }
        else {
            if (this.demande == "Liste des formations") {

                this.service.put('/demandeconge/', this.demandeCongeFrom.value).subscribe(
                    data => {
                        this.demandeConge = data;
                        this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Liste des formations ajouter avec succée' });
                        this.initConge();
                        this.findElementTable();

                    })
            }
       if (this.demande == "Mes formations") {

                this.service.put('/demandedefichedepaie/', this.demandeficheFrom.value).subscribe(
                    data => {
                        this.demandeFichePaie = data;
                        this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande fiche de paie ajouter avec succée' });
                        this.initfiche();
                        this.findElementTable();

                    })
            }
        }

    }
    initfiche() {
        this.demandeficheFrom = this.fb.group({
            id: [null],
            employe: [null, Validators.required],
            datedemande: [null, Validators.required],
            dateEnvoieFiche: [null],
            code: [null, Validators.required],
            etat: [null, Validators.required],
        })
    }

    demandeConge = [];
    demandeMission = [];
    demandeFichePaie = [];
    btnC =
        {
            label: 'Liste des formations', value: 'liste-des-formation', isActive: true
        };
    btnM = {
        label: 'Mes formations', value: 'mes-formation', isActive: false
    };


    demande:string='Liste des formations';
    libelleLike: string = "";

    selectbtnC(){
        this.btnC.isActive=true;
        this.btnM.isActive=false;
         this.demande = this.btnC.label;
        console.log(this.demande);
        this.findElementTable();
        this.initConge();
        if (this.libelleLike?.length >0)
            this.findByLibelle(this.libelleLike)
        this.isAdd = false;
    }
    selectbtnM(){
        this.btnC.isActive=false;
        this.btnM.isActive = true;
         this.demande = this.btnM.label;
        this.initmission();
        this.findElementTable();
        if (this.libelleLike?.length >0)
            this.findByLibelle(this.libelleLike)

        console.log(this.demande);
        this.isAdd = false;

    }




    constructor(
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private service: ApiJurisService,
        private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.initEmploye()
        this.initin()
        this.findAllEmploye()
        this.findElementTable()
        console.log(this.demande)
        if (this.demande == "Liste des formations") {
            this.initConge()

        }
        if (this.demande == "Mes formations") {
            this.initfiche()

        }

    }

    findElementTable() {
        if (this.demande == "Liste des formations") {
            this.service.get('/formation/').subscribe(res => {
                this.demandeConge = res
            })
        }

        if (this.demande == "Mes formations") {
            this.service.get('/formationEmploye/employe/'+localStorage.getItem('user')).subscribe(res => {
                this.demandeFichePaie = res
            })
        }

    }
    findAllEmploye(){


        this.service.get('/employe/').subscribe(res => {
            this.employes = res
        })
    }

    findByLibelle(libelleLike: string) {
        if (libelleLike.length ==0) this.findElementTable();
        else {
            if (this.demande == "Liste des formations") {
                this.service.get('/demandeconge/libelle/' + libelleLike).subscribe(res => {
                    this.demandeConge = res
                })
            }

            if (this.demande == "Mes formations") {
                this.service.get('/demandedefichedepaie/code/' + libelleLike).subscribe(res => {
                    this.demandeFichePaie = res
                })
            }

        }

    }

    openDelete(id: number) {
        this.confirmationService.confirm({
            message: 'Voulez vous vraiment supprimer cet Demande',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteById(id);
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Anuller',
                            detail: 'suppression annuler'
                        });
                        break;

                }
            }
        });
    }

    employe : any;
    initEmploye(){
        this.service.get('/employe/'+localStorage.getItem('user')).subscribe((res)=>{
            this.employe = res;
           })
    }

    updateElement(demande) {

        let formationEmploye = { 'employe' : this.employe , 'formation' : demande }
        console.log(formationEmploye);
         this.service.post('/formationEmploye/',formationEmploye).subscribe((el)=>{
             console.log('formationEmploye==>'+el)
             this.messageService.add({
             severity: 'success',
             summary: 'Incription avec succée',
             detail: 'Veuillez verifier vos formations'
         });
         this.findElementTable()
     },
             (error)=>{
                 this.messageService.add({
                     severity: 'error',
                     summary: 'Incription deja exist',
                     detail: 'Vous etes deja inscrie dans cette formation'
                 });
             })

    }

    deleteById(id: number) {

        if (this.demande == "Liste des formations") {
            this.service.delete('/demandeconge/' , id).subscribe(
                res => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Suppression avec succée',
                        detail: 'Demande de congé est supprimée avec succée'
                    });
                    this.findElementTable();
                }
            );
        }
        if (this.demande == "Mes formations") {
            this.service.delete('/demandedefichedepaie/' , id).subscribe(
                res => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Suppression avec succée',
                        detail: 'Demande de fiche de pai est supprimée avec succée'
                    });
                    this.findElementTable();

                }
            );
        }


    }
    formationinscription : any;
    openInscription(value){
        this.formationinscription=value
        this.confirmationService.confirm({
            message: 'Voulez vous vraiment inscrire dans cette formation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.updateElement(value);
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
