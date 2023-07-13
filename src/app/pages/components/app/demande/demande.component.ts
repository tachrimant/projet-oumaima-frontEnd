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
            employee: [null, Validators.required],
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
                    this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande congé ajouter avec succée' });
                    this.initConge();

                })
             }
        if (this.demande == "Demande de mission") {

            this.service.post('/demandemission/', this.demandemissionFrom.value).subscribe(
                data => {
                    this.demandes = data;
                    this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande mission ajouter avec succée' });
                    this.initmission();

                })
             }        if (this.demande == "Demande de fiche de paie") {

            this.service.post('/demandedefichedepaie/', this.demandeficheFrom.value).subscribe(
                data => {
                    this.demandes = data;
                    this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande fiche de paie ajouter avec succée' });
                    this.initfiche();

                })
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
    libelleLike: string;

    selectbtnC(){
        this.btnC.isActive=true;
        this.btnM.isActive=false;
        this.btnFP.isActive = false;
        this.demande = this.btnC.label;
        this.findElementTable();
        if (this.libelleLike.length >0)
            this.findByLibelle(this.libelleLike)
    }
    selectbtnM(){
        this.btnC.isActive=false;
        this.btnM.isActive = true;
        this.btnFP.isActive = false;
        this.demande = this.btnM.label;
        this.findElementTable();
        if (this.libelleLike.length >0)
            this.findByLibelle(this.libelleLike)

    }

    selectbtnFP() {
        this.btnC.isActive = false;
        this.btnM.isActive = false;
        this.btnFP.isActive = true;
        this.demande = this.btnFP.label;
        this.findElementTable();
        if (this.libelleLike.length >0)
            this.findByLibelle(this.libelleLike)

    }


    constructor(
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private service: ApiJurisService,
        private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.findAllEmploye()
        this.findElementTable()
        if (this.demande == "Demande congé") {
            this.initConge()

        }
        if (this.demande == "Demande de fiche de paie") {
            this.initfiche()

        }
        if (this.demande == "Demande de mission") {
            this.initmission()

        }

    }

    findElementTable() {
        this.demandes = [];
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

    findByLibelle(libelleLike: string) {
        if (libelleLike.length ==0) this.findElementTable();

        if (this.demande == "Demande congé") {
            this.service.get('/demandeconge/libelle/' + libelleLike).subscribe(res => {
                this.demandes = res
            })
        }

        if (this.demande == "Demande de fiche de paie") {
            this.service.get('/demandedefichedepaie/libelle/' + libelleLike).subscribe(res => {
                this.demandes = res
            })
        }
        if (this.demande == "Demande de mission") {
            this.service.get('/demandemission/libelle/' + libelleLike).subscribe(res => {
                this.demandes = res
            })
        }
    }
}
