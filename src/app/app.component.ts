import { Component, OnInit } from '@angular/core';
import { Emploee } from './models/emploee';
import { Employer } from './models/employer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employer: Employer = new Employer(1, "", "", "", "", "", 0, true);
  emploees: Emploee[] = [];
  isEdit: boolean = true;

  saveEmploees(emploees: Emploee[]) {
    this.emploees = { ...emploees };
  }

  saveEmployer(employer: Employer) {
    this.employer = employer;
  }

  saveIsEdit(isEdit: boolean) {
    this.isEdit = isEdit;
  }

  ngOnInit(): void {
    this.employer.isEdit = true;
  }
}
