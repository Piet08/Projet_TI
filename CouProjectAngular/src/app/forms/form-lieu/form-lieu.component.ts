import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-from-lieu',
  templateUrl: './form-lieu.component.html',
  styleUrls: ['./form-lieu.component.css']
})
export class FormLieuComponent implements OnInit {

  formLieu:FormGroup = this.fb.group({
    nom : this.fb.control('',Validators.required),
    type : this.fb.control('',Validators.required),
    description : this.fb.control('',Validators.required),
    adresse:this.fb.group({
      rue : this.fb.control('',Validators.required),
      cp : this.fb.control('',[Validators.required,Validators.pattern(/^\d{4}$/)]),
      ville : this.fb.control('',Validators.required),
      num : this.fb.control('',Validators.required)
    })
  })
  constructor(public fb:FormBuilder) { }

  ngOnInit() {
  }

  alertMe() {
    alert(JSON.stringify(this.formLieu.getRawValue()));
  }
}
