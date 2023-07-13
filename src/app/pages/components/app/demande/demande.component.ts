import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {ApiJurisService} from "../../../services/api-juris.service";

@Component({
    selector: 'app-demande',
    templateUrl: './demande.component.html',
    styleUrls: ['./demande.component.scss'],
    providers: [ConfirmationService, MessageService]

})
export class DemandeComponent implements OnInit {
    principalForm: FormGroup;
    demandeCongeFrom: FormGroup;
    demandemissionFrom: FormGroup;
    demandeficheFrom: FormGroup;
    isAdd: boolean = false
    isUpdate: boolean = false
    employes=[]
    initConge() {
        this.demandeCongeFrom = this.fb.group({

            employe: [null, Validators.required],
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
        if (this.demande == "Demande congé") {
       this.initConge()
        }

        if (this.demande == "Demande de fiche de paie") {
            this.initfiche()
        }
        if (this.demande == "Demande de mission") {
            this.initmission()
        }
        this.isAdd = !this.isAdd
    }

    initmission() {
        this.demandemissionFrom = this.fb.group({
            id: [null],
            employe: [null, Validators.required],
            dateFin: [null, Validators.required],
            dateDebut: [null, Validators.required],
            code: [null, Validators.required],
            libelle: [null, Validators.required],
            etat: [null, Validators.required],
        })
    }
    save(){

        if (this.demande == "Demande congé") {

            this.service.post('/demandeconge/', this.demandeCongeFrom.value).subscribe(
                data => {
                    this.demandes = data;
                    this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Employé ajouter avec succée' });
                    this.initConge();

                }
            )


    }
    }
    initfiche() {
        this.demandeficheFrom = this.fb.group({
            id: [null],
            employe: [null, Validators.required],
            datedemande: [null, Validators.required],
            dateEnvoieFiche: [null, Validators.required],
            code: [null, Validators.required],
            etat: [null, Validators.required],
        })
    }

    demandes;
    btnC =
        {
            label: 'Demande congé', value: 'demande-conge', isActive: true
        };
    btnM = {
        label: 'Demande de mission', value: 'demande-mission', isActive: false
    };
    btnFP = {
            label:'Demande de fiche de paie',value:'demande-fiche-paie',isActive:false
        } ;

    demande:string='Demande congé';
    selectbtnC(){
        this.btnC.isActive=true;
        this.btnM.isActive=false;
        this.btnFP.isActive = false;
        this.demande = this.btnC.label;
    }
    selectbtnM(){
        this.btnC.isActive=false;
        this.btnM.isActive = true;
        this.btnFP.isActive = false;
        this.demande = this.btnM.label;
    }

    selectbtnFP() {
        this.btnC.isActive = false;
        this.btnM.isActive = false;
        this.btnFP.isActive = true;
        this.demande = this.btnFP.label;
    }


    constructor(
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private service: ApiJurisService,
        private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.findAllEmploye()
        if (this.demande == "Demande congé") {
            this.initConge()
            this.principalForm = this.demandeCongeFrom

        }
        if (this.demande == "Demande de fiche de paie") {
            this.principalForm = this.demandeficheFrom
        }
        if (this.demande == "Demande de mission") {
            this.principalForm = this.demandemissionFrom
        }
        this.findElementTable()
    }

    findElementTable() {
        if (this.demande == "Demande congé") {
            this.service.get('/demandeconge/').subscribe(res => {
                this.demandes = res
            })
        }

        if (this.demande == "Demande de fiche de paie") {
            this.service.get('/demandedefichedepaie/').subscribe(res => {
                this.demandes = res
            })
        }
        if (this.demande == "Demande de mission") {
            this.service.get('/demandemission/').subscribe(res => {
                this.demandes = res
            })
        }
    }
findAllEmploye(){


        this.service.get('/employe/').subscribe(res => {
        this.employes = res
    })
}
}
