import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {
    demandeConge = [];

  constructor() { }

  ngOnInit(): void {

      this.demandeConge = [
          {nom : 'Resources Humaines' },
          {nom : 'Administratif' },
          {nom : 'Informatique' },
      ]
  }

}
