import { Emploee } from './../models/emploee';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {

  @Input() numberOfEmployees = 0;
  emploees: Emploee[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= this.numberOfEmployees; i++) {
      this.emploees.push(new Emploee(i, '', '', '', '', ''))
    }
  }

  emploeeForm: FormGroup = new FormGroup({
    "emploeeName": new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z_]*")]),
    "emploeeLastName": new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z_]*")]),
    "emploeePhoneNumber": new FormControl('', Validators.pattern("[0-9]{10}")),
    "emploeeEmail": new FormControl('', [Validators.required, Validators.email]),
    "emploeePosition": new FormControl(2, Validators.required)
  });

  submit() {
  
  }
}

