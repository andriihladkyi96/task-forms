import { Component } from '@angular/core';
import { Emploee } from './models/emploee';
import { Employer } from './models/employer';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  employer: Employer;
  emploees: Emploee[] = [];
  isEdit: boolean = true;

  constructor(private localStorageService: LocalStorageService) { }

  saveEmploees(emploees: Emploee[]) {
    this.emploees = { ...emploees };
    this.localStorageService.setItem('emploees', emploees);
  }

  saveEmployer(employer: Employer) {
    this.employer = employer;
    this.localStorageService.setItem('employer', employer);
  }

  saveIsEdit(isEdit: boolean) {
    this.isEdit = isEdit;
  }

  ngOnInit(): void {
    this.employer = this.localStorageService.getItem('employer') ? this.localStorageService.getItem('employer') : new Employer(1, "", "", "", "", "", 0, true);
    this.emploees = this.localStorageService.getItem('emploees') ? this.localStorageService.getItem('emploees') : [];
    this.employer.isEdit = true;
  }
}
