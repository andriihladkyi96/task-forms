import { Emploee } from './../models/emploee';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit, OnDestroy {

  @Input() numberOfEmployees: number;
  @Input() emploees: Emploee[];
  @Output() saveEmploees = new EventEmitter<Emploee[]>();

  displayedColumns: string[] = ['name', 'lastName', 'email', 'phoneNumber', 'position'];
  isEdit: boolean = true;

  ngOnInit(): void {
    this.fillArrayOfEmployees();
    if (this.emploees.length !== 0) {
      this.changeEdit();
      debugger
    }
  }

  ngOnDestroy(): void {
    this.saveEmploees.emit(this.emploees);
  }

  emploeeForm: FormGroup = new FormGroup({
    "emploeeName": new FormControl('', [Validators.required, Validators.pattern("[a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії][a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії_]*"), Validators.minLength(2), Validators.maxLength(20)]),
    "emploeeLastName": new FormControl('', [Validators.required, Validators.pattern("[a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії][a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії_]*")]),
    "emploeePhoneNumber": new FormControl(null, [Validators.pattern('(\\+380[\d]{9})|(0[\d]{9})*')]),
    "emploeeEmail": new FormControl('', [Validators.required, Validators.email]),
    "emploeePosition": new FormControl('', [Validators.required, this.userNameValidator])
  });

  submit(id: number) {
    this.emploees[id].email = this.emploeeForm.value.emploeeEmail;
    this.emploees[id].name = this.emploeeForm.value.emploeeName;
    this.emploees[id].lastName = this.emploeeForm.value.emploeeLastName;
    this.emploees[id].phoneNumber = this.emploeeForm.value.emploeePhoneNumber;
    this.emploees[id].position = this.emploeeForm.value.emploeePosition;
    this.emploees[id].isEdit = false;
    this.changeEdit();
  }

  private changeEdit() {
    this.isEdit = !this.emploees.every(e => e.isEdit == false);
  }

  private userNameValidator(control: FormControl): { [s: string]: boolean } | null {

    const value: string = control.value.toLowerCase();

    if (value === "trainee" || value === "junior" || value === "middle" || value === "senior") {
      return null;
    }
    return { "emploeePosition": true };
  }

  private fillArrayOfEmployees() {
    debugger
    if (this.emploees.length == 0) {
      for (let i = 1; i <= this.numberOfEmployees; i++) {
        this.emploees.push(new Emploee(i, '', '', '', '', '', true))
      }
    } else {
      let index = this.numberOfEmployees - this.emploees.length;
      if (index > 0) {
        for (let i = 1; i <= index; i++) {
          this.emploees.push(new Emploee(this.emploees.length + 1, '', '', '', '', '', true))
        }
      }
      if (index < 0) {
        for (let i = 1; i <= -index; i++) {
          this.emploees.pop();
        }
      }
    }
  }
}

