import { Emploee } from './../models/emploee';
import { Employer } from './../models/employer';
import { Component } from '@angular/core';


@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.scss']
})
export class TemplateDrivenFormsComponent {

  employer: Employer = new Employer(1, "", "", "", "", "", 0, true);
  displayedColumns: string[] = ['name', 'lastName', 'email', 'phoneNumber', 'companyName', 'numberOfEmployees'];
  emploees: Emploee[] = [];
  employers: Employer[] = [];

  saveEmploees(emploees: Emploee[]) {
    this.emploees = { ...emploees };
  }


  addEmployer() {
    let index = this.employers.findIndex(e => e.id === this.employer.id);
    if (index !== -1) {
      this.employers.splice(index, 1, this.employer)
    } else {
      this.employers.push(this.employer);
    }
    this.employer.isEdit = false;
  }
}

