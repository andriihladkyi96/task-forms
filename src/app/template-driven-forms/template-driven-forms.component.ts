import { Emploee } from './../models/emploee';
import { Employer } from './../models/employer';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage.service';


@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.scss']
})
export class TemplateDrivenFormsComponent implements OnInit {

  employer: Employer;
  displayedColumns: string[] = ['name', 'lastName', 'email', 'phoneNumber', 'companyName', 'numberOfEmployees'];
  emploees: Emploee[] = [];
  employers: Employer[] = [];

  saveEmploees(emploees: Emploee[]) {
    this.emploees = { ...emploees };
  }

  constructor(private localStorageService: LocalStorageService){

  }

  ngOnInit(): void {
    this.employer = this.localStorageService.getItem('employer') ? this.localStorageService.getItem('employer') :  new Employer(1, "", "", "", "", "", 0, true);
  }


  addEmployer() {
    let index = this.employers.findIndex(e => e.id === this.employer.id);
    if (index !== -1) {
      this.employers.splice(index, 1, this.employer)
    } else {
      this.employers.push(this.employer);
    }
    this.localStorageService.setItem('employer', this.employer);
    this.employer.isEdit = false;
  }

  editEmployer() {
    this.employer.isEdit = true;
    // this.emploees.forEach(e => e.isEdit = true);
  }
}

