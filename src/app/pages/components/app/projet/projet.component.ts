import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
isAdd:boolean=false
    projets;
    tacheFrom: FormGroup;
    constructor(private fb : FormBuilder) {

    }

    ngOnInit(): void {
        this.initForm()
        this.projets=[
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},
            {description:'wami',projet:'scc',datedebut:'12-06-2023',datefin:'19-07-2024',employe:'dscsc'},

        ]
    }

    initForm(){

        this.tacheFrom = this.fb.group(
            {
                dateDebut : [null, Validators.required],
                dateFin : [null, Validators.required],
                description : [null, Validators.required],
                employe : [null, Validators.required],
                projet : [null, Validators.required]
            }
        )
    }

    addElement(){
        this.isAdd=!this.isAdd;
    }
    save(){

    }
}
