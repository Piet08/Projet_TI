import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {authenticateModel} from "../../../User/authenticateModel";


@Component({
  selector: 'app-form-connection',
  templateUrl: './form-connection.component.html',
  styleUrls: ['./form-connection.component.css']
})
export class FormConnectionComponent implements OnInit {

  formulaireConnexion: FormGroup = this.fb.group({
    username: this.fb.control("",Validators.required),
    motDePasseConnexion : this.fb.control("",Validators.required)
  });

  @Output()
  userConnected:EventEmitter<authenticateModel> = new EventEmitter<authenticateModel>();


  constructor(public fb: FormBuilder) { }

  ngOnInit() {
  }


  verificationFormulaire(){
    if(/*this.verificationEmail() &&*/ this.formulaireConnexion.valid) return false;
    return true;
  }
  private buildUserConnected():authenticateModel{
    const userConnected = new authenticateModel();
    userConnected.username = this.formulaireConnexion.get("username").value;
    userConnected.password = this.formulaireConnexion.get("motDePasseConnexion").value;
    userConnected.token;
    return userConnected;
  }
  emitNewUserConnected() {
    this.userConnected.next(this.buildUserConnected());
    this.formulaireConnexion.reset();
  }

}
