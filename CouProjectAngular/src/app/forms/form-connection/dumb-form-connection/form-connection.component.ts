import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Utilisateur} from "../../../Utilisateur/Utilisateur";
import {authenticateModelDto} from "../../../Utilisateur/authenticateModel-dto";
import {authenticateModel} from "../../../Utilisateur/authenticateModel";

@Component({
  selector: 'app-form-connection',
  templateUrl: './form-connection.component.html',
  styleUrls: ['./form-connection.component.css']
})
export class FormConnectionComponent implements OnInit {

  formulaireConnexion: FormGroup = this.fb.group({
    username: this.fb.control("",Validators.required),
    motDePasseConnexion : this.fb.control("",Validators.required),
    resterConnecte : this.fb.control("")
  });

  @Output()
  userConnected:EventEmitter<authenticateModel> = new EventEmitter<authenticateModel>();

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
  }


  /*verificationEmail(){
    var regex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    if(this.formulaireConnexion.controls.emailConnexion.value.match(regex) !== null) return true;
    return false;
  }*/

  verificationFormulaire(){
    if(/*this.verificationEmail() &&*/ this.formulaireConnexion.valid) return false;
    return true;
  }
  private buildUserConnected():authenticateModel{
    const userConnected = new authenticateModel();
    userConnected.username = this.formulaireConnexion.get("username").value;
    userConnected.password = this.formulaireConnexion.get("motDePasseConnexion").value;
    return userConnected;
  }
  emitNewUserConnected() {
    this.userConnected.next(this.buildUserConnected());
    console.log(this.userConnected);
    this.formulaireConnexion.reset();
  }

}
