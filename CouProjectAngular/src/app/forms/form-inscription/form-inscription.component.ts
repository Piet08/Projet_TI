import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.css']
})
export class FormInscriptionComponent implements OnInit {

  private _villesJSON : Observable<any> = this.http.get("liste-des-codes-postaux-belges-fr.json");


  formulaireInscription: FormGroup = this.fb.group({
    emailInscription: this.fb.control("", Validators.required),
    name: this.fb.control("", Validators.required),
    prenom: this.fb.control("", Validators.required),
    motDePasse: this.fb.control("", Validators.required),
    verifMotDePasse: this.fb.control("", Validators.required),
    numero: this.fb.control("", Validators.required),
    straat: this.fb.control("", Validators.required),
    codePostal: this.fb.control("", Validators.required),
    city: this.fb.control("", Validators.required)
  });



  constructor(public fb : FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.chargerVillesJSON();
  }

  alertME() {
      console.log(this.formulaireInscription.controls.emailInscription.value);
  }

  verificationMotDePasse(){
    return this.formulaireInscription.controls.motDePasse.value === this.formulaireInscription.controls.verifMotDePasse.value
  }

  verificationEmail(){
    var regex = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    if(this.formulaireInscription.controls.emailInscription.value.match(regex) !== null) return true;
    return false;
  }

  verificationFormulaire(){
    if(this.verificationMotDePasse() && this.verificationEmail() && this.formulaireInscription.valid) return false;
    return true;
  }

  chargerVillesJSON(){
      console.log(this._villesJSON);
  }


}
