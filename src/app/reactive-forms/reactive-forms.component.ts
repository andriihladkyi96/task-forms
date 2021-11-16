import { Emploee } from './../models/emploee';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    this.fillFormArray();
    // if (this.emploees.length !== 0) {
      this.changeEdit();
    // }
  }

  ngOnDestroy(): void {
    this.saveEmploees.emit(this.emploees);
  }

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    emploeeArrayForm: this.fb.array([])
  });

  get emploeeArrayForm(): FormArray {
    return this.form.controls["emploeeArrayForm"] as FormArray;
  }

  getControls(): FormGroup[] {
    return (this.form.controls["emploeeArrayForm"] as FormArray).controls as FormGroup[];
  }

  addEmploeeForm() {
    const emploeeForm = this.fb.group({
      "emploeeName": ['', [Validators.required, Validators.pattern("[a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії][a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії_]*"), Validators.minLength(2), Validators.maxLength(20)]],
      "emploeeLastName": ['', [Validators.required, Validators.pattern("[a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії][a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії_]*")]],
      "emploeePhoneNumber": [null, Validators.pattern("^((0[0-9]{9})|(\\+380[0-9]{9}))*")],
      "emploeeEmail": ['', [Validators.required, Validators.email]],
      "emploeePosition": ['', [Validators.required, this.userNameValidator]]
    });

    this.emploeeArrayForm.push(emploeeForm);
  }


  deleteEmploeeForm(lessonIndex: number) {
    this.emploeeArrayForm.removeAt(lessonIndex);
  }

  submit(id: number) {
    this.emploees[id].email = this.emploeeArrayForm.controls[id].value.emploeeEmail;
    this.emploees[id].name = this.emploeeArrayForm.controls[id].value.emploeeName;
    this.emploees[id].lastName = this.emploeeArrayForm.controls[id].value.emploeeLastName;
    this.emploees[id].phoneNumber = this.emploeeArrayForm.controls[id].value.emploeePhoneNumber;
    this.emploees[id].position = this.emploeeArrayForm.controls[id].value.emploeePosition;
    this.emploees[id].isEdit = false;
    this.changeEdit();
  }

  editEmploees() {
    this.emploees.forEach(e => e.isEdit = true);
    this.changeEdit();
  }


  private fillFormArray() {
    for (let i = 1; i <= this.numberOfEmployees; i++) {
      this.addEmploeeForm();
    }
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

