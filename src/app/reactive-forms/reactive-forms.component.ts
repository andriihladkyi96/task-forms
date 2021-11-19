import { Emploee } from './../models/emploee';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {

  @Input() numberOfEmployees: number;
  @Input() emploees: Emploee[];
  @Output() saveEmploees = new EventEmitter<Emploee[]>();

  displayedColumns: string[] = ['name', 'lastName', 'email', 'phoneNumber', 'position'];
  positionList: string[] = ["trainee", "junior", "middle", "senior"];
  isEdit: boolean = true;

  ngOnInit(): void {
    this.fillArrayOfEmployees();
    this.fillFormArray();
    this.editEmploees();
  }

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    emploeeArrayForm: this.fb.array([])
  });

  get emploeeArrayForm(): FormArray {
    return this.form.controls["emploeeArrayForm"] as FormArray;
  }

  getControls() {
    return (this.form.controls["emploeeArrayForm"] as FormArray).controls as FormGroup[];
  }

  submit(id: number) {
    this.emploees[id] = Object.assign(this.emploees[id], { isEdit: false }, this.emploeeArrayForm.controls[id].value);
    this.saveEmploees.emit(this.emploees);
    this.changeEdit();
  }


  private fillFormArray() {
    //creates a FormGroup for each employee
    for (let i = 1; i <= this.numberOfEmployees; i++) {
      this.addEmploeeForm();
    }
    // fills the form with values ​​from the server
    this.emploeeArrayForm.patchValue(this.emploees);
  }

  private addEmploeeForm() {
    const emploeeForm = this.fb.group({
      "name": ['', [Validators.required, Validators.pattern("[a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії][a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії\\-]*"), Validators.minLength(2), Validators.maxLength(20)]],
      "lastName": ['', [Validators.required, Validators.pattern("[a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії][a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії\\-]*")]],
      "phoneNumber": [null, Validators.pattern("^((0[0-9]{9})|(\\+380[0-9]{9}))*")],
      "email": ['', [Validators.required, Validators.email]],
      "position": ['', [Validators.required]]
    });
    this.emploeeArrayForm.push(emploeeForm);
  }
  
  // enable editing for employees
  editEmploees() {
    this.emploees.forEach(e => e.isEdit = true);
    this.changeEdit();
  }

  //shows a table with employees only when each employee is entered
  private changeEdit() {
    if (this.emploees.length !== 0) {
      this.isEdit = !this.emploees.every(e => e.isEdit == false);
    }
  }

  // fill the array with employees depending on the change in the number of employees
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

