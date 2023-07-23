import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {ApiJurisService} from "../../../services/api-juris.service";

@Component({
  selector: 'app-demande-employe',
  templateUrl: './demande-employe.component.html',
  styleUrls: ['./demande-employe.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class DemandeEmployeComponent implements OnInit {

     demandeCongeFrom: FormGroup;
    demandemissionFrom: FormGroup;
    demandeficheFrom: FormGroup;
    isAdd: boolean = false
    isUpdate: boolean = false
    employes=[]
    saveelemnt = true;

    demandeCongetype = [
        {nom : 'Congé administratif' },
        {nom : 'Congé de maladie' },
        {nom : 'Congé sans solde' },
        {nom : 'Congé de maternité' },
    ]


    initConge() {
    this.service.get('/employe/'+localStorage.getItem('user')).subscribe((res)=>{
        this.demandeCongeFrom = this.fb.group({
            id : [null],
            employee: [res],
            dateFin: [null, Validators.required],
            dateDebut: [null, Validators.required],
            code: [null, Validators.required],
            libelle: [null, Validators.required],
            etat: ['En cours'],
            jourCouvrable: [null, Validators.required],
        })
        })

    }

    showAdd() {
        this.isUpdate=false
        this.saveelemnt = true;
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
        this.service.get('/employe/'+localStorage.getItem('user')).subscribe((res)=>{

            this.demandemissionFrom = this.fb.group({
                id: [null],
                employee: [res],
                dateFin: [null, Validators.required],
                dateDebut: [null, Validators.required],
                code: [null, Validators.required],
                libelle: [null, Validators.required],
                etat: ['En cours'],
            })
        })

    }

    save(){
        if (this.saveelemnt){
            if (this.demande == "Demande congé") {

                this.service.post('/demandeconge/', this.demandeCongeFrom.value).subscribe(
                    data => {
                    this.findElementTable()
                        this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande congé ajouter avec succée' });
                        this.initConge();
                    })
            }
            if (this.demande == "Demande de mission") {

                this.service.post('/demandemission/', this.demandemissionFrom.value).subscribe(
                    data => {
                        this.findElementTable()
                        this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande mission ajouter avec succée' });
                        this.initmission();

                    })
            }        if (this.demande == "Demande de fiche de paie") {

                this.service.post('/demandedefichedepaie/', this.demandeficheFrom.value).subscribe(
                    data => {
                        this.findElementTable()
                        this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande fiche de paie ajouter avec succée' });
                        this.initfiche();

                    })
            }
        }
        else {
            if (this.demande == "Demande congé") {

                this.service.put('/demandeconge/', this.demandeCongeFrom.value).subscribe(
                    data => {
                        this.findElementTable()
                        this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande congé ajouter avec succée' });
                        this.initConge();


                    })
            }
            if (this.demande == "Demande de mission") {

                this.service.put('/demandemission/', this.demandemissionFrom.value).subscribe(
                    data => {
                        this.findElementTable()
                        this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande mission ajouter avec succée' });
                        this.initmission();


                    })
            }
            if (this.demande == "Demande de fiche de paie") {

                this.service.put('/demandedefichedepaie/', this.demandeficheFrom.value).subscribe(
                    data => {
                        this.findElementTable()
                        this.messageService.add({ severity: 'success', summary: 'Ajouter', detail: 'Demande fiche de paie ajouter avec succée' });
                        this.initfiche();


                    })
            }
        }

    }
    initfiche() {
        this.service.get('/employe/'+localStorage.getItem('user')).subscribe((res)=>{
            this.demandeficheFrom = this.fb.group({
                id: [null],
                employe: [res],
                datedemande: [null, Validators.required],
                dateEnvoieFiche: [null],
                code: [null, Validators.required],
                etat: ['En cours'],
            })

        })

    }

    demandeConge = [];
    demandeMission = [];
    demandeFichePaie = [];
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
    libelleLike: string = "";

    selectbtnC(){
        this.btnC.isActive=true;
        this.btnM.isActive=false;
        this.btnFP.isActive = false;
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
        this.btnFP.isActive = false;
        this.demande = this.btnM.label;
        this.initmission();
        this.findElementTable();
        if (this.libelleLike?.length >0)
            this.findByLibelle(this.libelleLike)

        console.log(this.demande);
        this.isAdd = false;

    }

    selectbtnFP() {
        this.btnC.isActive = false;
        this.btnM.isActive = false;
        this.btnFP.isActive = true;
        this.demande = this.btnFP.label;
        this.findElementTable();
        this.initfiche();
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
        this.findAllEmploye()
        this.findElementTable()
        console.log(this.demande)
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
        if (this.demande == "Demande congé") {
            this.service.get('/demandeconge/employe/'+localStorage.getItem('user')).subscribe(res => {
                this.demandeConge = res
            })
        }

        if (this.demande == "Demande de fiche de paie") {
            this.service.get('/demandedefichedepaie/employe/'+localStorage.getItem('user')).subscribe(res => {
                this.demandeFichePaie = res
            })
        }
        if (this.demande == "Demande de mission") {
            this.service.get('/demandemission/employe/'+localStorage.getItem('user')).subscribe(res => {
                this.demandeMission = res
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
            if (this.demande == "Demande congé") {
                this.service.get('/demandeconge/libelle/' + libelleLike+'/employe/'+localStorage.getItem("user")).subscribe(res => {
                    this.demandeConge = res
                })
            }

            if (this.demande == "Demande de fiche de paie") {
                this.service.get('/demandedefichedepaie/code/' + libelleLike+'/employe/'+localStorage.getItem("user")).subscribe(res => {
                    this.demandeFichePaie = res
                })
            }
            if (this.demande == "Demande de mission") {
                this.service.get('/demandemission/libelle/' + libelleLike+'/employe/'+localStorage.getItem("user")).subscribe(res => {
                    this.demandeMission = res
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

    updateElement(demande) {
        this.isAdd=true
        this.saveelemnt = false;
        this.isUpdate=true;

        if (this.demande == "Demande congé") {
            const selectedemploye = this.employes.find(employe => employe.id === demande.employee.id);
            const typedemande = this.demandeCongetype.find(type => type.nom === demande.libelle);
            this.demandeCongeFrom.patchValue({
                id: demande.id,
                employee: selectedemploye,
                dateFin: new Date(demande.dateFin),
                dateDebut: new Date(demande.dateDebut),
                code: demande.code,
                etat: demande.etat,
                jourCouvrable: demande.jourCouvrable
            })
            this.demandeCongeFrom.controls['libelle'].setValue(typedemande.nom);
        }
        if (this.demande == "Demande de fiche de paie") {
            const selectedemploye = this.employes.find(employe => employe.id === demande.employe.id);

            this.demandeficheFrom.patchValue({
                id: demande.id,
                employe: selectedemploye,
                datedemande: new Date(demande.datedemande),
                dateEnvoieFiche: new Date(demande.dateEnvoieFiche),
                code: demande.code,
                etat: demande.etat,
            })
        }
        if (this.demande == "Demande de mission") {
            const selectedemploye = this.employes.find(employe => employe.id === demande.employee.id);

            this.demandemissionFrom.patchValue({
                id: demande.id,
                employee: selectedemploye,
                dateFin: new Date(demande.dateFin),
                dateDebut: new Date(demande.dateDebut),
                code: demande.code,
                libelle: demande.libelle,
                etat: demande.etat,
            })
        }
    }

    deleteById(id: number) {

        if (this.demande == "Demande congé") {
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
        if (this.demande == "Demande de fiche de paie") {
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
        if (this.demande == "Demande de mission") {
            this.service.delete('/demandemission/' , id).subscribe(
                res => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Suppression avec succée',
                        detail: 'Demande de mission est supprimée avec succée'
                    });
                    this.findElementTable();

                }
            )
        }

    }

}
