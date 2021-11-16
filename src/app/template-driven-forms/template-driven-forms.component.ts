import { Employer } from './../models/employer';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-template-driven-forms',
  templateUrl: './template-driven-forms.component.html',
  styleUrls: ['./template-driven-forms.component.scss']
})
export class TemplateDrivenFormsComponent {

  @Input() employer: Employer;
  @Input() isEdit: boolean;
  @Output() saveEmployer = new EventEmitter<Employer>();
  @Output() saveIsEdit = new EventEmitter<boolean>();
  displayedColumns: string[] = ['name', 'lastName', 'email', 'phoneNumber', 'companyName', 'numberOfEmployees'];
  employers: Employer[] = [];

  addEmployer() {
    let index = this.employers.findIndex(e => e.id === this.employer.id);
    if (index !== -1) {
      this.employers.splice(index, 1, this.employer)
    } else {
      this.employers.push(this.employer);
    }
    this.saveEmployer.emit(this.employer);
    this.saveIsEdit.emit(false);
  }

  editEmployer() {
    this.saveIsEdit.emit(true);
  }
}

