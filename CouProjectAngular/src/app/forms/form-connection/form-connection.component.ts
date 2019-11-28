import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-connection',
  templateUrl: './form-connection.component.html',
  styleUrls: ['./form-connection.component.css']
})
export class FormConnectionComponent implements OnInit {
  formulaireConnexion: FormGroup = this.fb.group({
    emailConnexion : this.fb.control("",Validators.required),
    motDePasseConnexion : this.fb.control("",Validators.required),
    resterConnecte : this.fb.control("")
  });

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
  }

  alertME() {
    console.log(this.formulaireConnexion.controls.emailConnexion.value);
  }

  verificationEmail(){
    var regex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    if(this.formulaireConnexion.controls.emailConnexion.value.match(regex) !== null) return true;
    return false;
  }

  verificationFormulaire(){
    if(this.verificationEmail() && this.formulaireConnexion.valid) return false;
    return true;
  }
}
