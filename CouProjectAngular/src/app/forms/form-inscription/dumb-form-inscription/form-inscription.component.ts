import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../User/user";
import {Address} from "../../../Address/address";


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

  @Output()
  userCreated:EventEmitter<User> = new EventEmitter<User>();
  @Output()
  adressCreated:EventEmitter<Address> = new EventEmitter<Address>();


  constructor(public fb : FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.chargerVillesJSON();
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

  emitNewUser() {
    this.adressCreated.next(this.buildAdressUser());
    this.userCreated.next(this.buildUser());
    this.formulaireInscription.reset();
  }



  private buildAdressUser():Address{
    const adress = new Address();
    adress.city = this.formulaireInscription.get("ville").value;
    adress.straat = this.formulaireInscription.get("rue").value;
    adress.num = this.formulaireInscription.get("num").value;
    adress.postalCode = this.formulaireInscription.get("codePostal").value;
    return adress;
  }

  private buildUser():User{
    const user = new User();
    user.email = this.formulaireInscription.get("emailInscription").value;
    user.name= this.formulaireInscription.get("nom").value;
    user.surname = this.formulaireInscription.get("prenom").value;
    user.hashpwd = this.formulaireInscription.get("motDePasse").value;
    user.type = "0";
    return user;
  }



}
