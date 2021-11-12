import { Emploee } from './../models/emploee';
import { Employer } from './../models/employer';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.scss']
})
export class TemplateDrivenFormsComponent {

  employer: Employer = new Employer("", "", "", "", "", 0);
  employers: Emploee[] = [];
  isSaved: boolean = false;
  
  addEmployer() {
    this.isSaved = true;
  }

  editEmployer() {
    this.isSaved = false;
  }
}

