import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {authenticateModel} from "../../../User/authenticateModel";
import {Router} from '@angular/router';


@Component({
  selector: 'app-form-connection',
  templateUrl: './form-connection.component.html',
  styleUrls: ['./form-connection.component.css']
})
export class FormConnectionComponent implements OnInit {

  formulaireConnexion: FormGroup = this.fb.group({
    username: this.fb.control("",Validators.required),
    password : this.fb.control("",Validators.required),
    remember : this.fb.control("")
  });

  @Output()
  userConnected:EventEmitter<any> = new EventEmitter<any>();

  imageSignIn : string = "iconfinder_sign-in_298868.png";

  constructor(public fb: FormBuilder,private router:Router) { }

  ngOnInit() {
  }


  verificationFormulaire(){
    if(/*this.verificationEmail() &&*/ this.formulaireConnexion.valid) return false;
    return true;
  }
  private buildUserConnected():authenticateModel{
    const userConnected = new authenticateModel();
    userConnected.username = this.formulaireConnexion.get("username").value;
    userConnected.password = this.formulaireConnexion.get("password").value;
    if(this.formulaireConnexion.get("remember").value)
      userConnected.remember = this.formulaireConnexion.get("remember").value;
    else
      userConnected.remember = false;

    return userConnected;
  }

  emitNewUserConnected() {
    this.userConnected.next(this.buildUserConnected());
    this.formulaireConnexion.reset();
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
