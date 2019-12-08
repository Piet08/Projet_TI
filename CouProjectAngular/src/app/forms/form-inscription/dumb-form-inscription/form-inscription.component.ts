import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../User/user";
import {Address} from "../../../Address/address";
import {PlaceAndAddressDto} from "../../../views/lieu/place-dto";
import {UserAndAddressDto} from "../../../User/user-dto";


@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.css']
})
export class FormInscriptionComponent implements OnInit {

  private _villesJSON : Observable<any> = this.http.get("liste-des-codes-postaux-belges-fr.json");


  formulaireInscription: FormGroup = this.fb.group({
    emailInscription: this.fb.control("", Validators.required),
    nom: this.fb.control("", Validators.required),
    prenom: this.fb.control("", Validators.required),
    pseudo: this.fb.control("", Validators.required),
    motDePasseInscription: this.fb.control("", Validators.required),
    verifMotDePasse: this.fb.control("", Validators.required),
    address:this.fb.group({
      straat : this.fb.control('',Validators.required),
      postalCode : this.fb.control('',[Validators.required,Validators.pattern(/^\d{4}$/)]),
      city : this.fb.control('',Validators.required),
      num : this.fb.control('',Validators.required)
    })
  });

  @Output()
  userCreated: EventEmitter<UserAndAddressDto> = new EventEmitter<UserAndAddressDto>();

  /*@Output()
  userCreated:EventEmitter<User> = new EventEmitter<User>();
  @Output()
  adressCreated:EventEmitter<Address> = new EventEmitter<Address>();*/


  constructor(public fb : FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.chargerVillesJSON();
  }

  /*verificationMotDePasse(){
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
  }*/

  chargerVillesJSON(){
  }

  emitNewUser() {
    this.userCreated.next(this.buildUserAndAddressDto());
    this.formulaireInscription.reset();
  }

  buildUserAndAddressDto(){
    const userCreate = {
      user : this.buildUser().toUtilisateurDto(),
      address : this.buildAddress().toAdresseDto()
    }
    return userCreate;
  }

  private buildAddress():Address{
    const adress = new Address();
    adress.city = this.formulaireInscription.get("address.city").value;
    adress.straat = this.formulaireInscription.get("address.straat").value;
    adress.num = this.formulaireInscription.get("address.num").value;
    adress.postalCode = this.formulaireInscription.get("address.postalCode").value;
    return adress;
  }

  private buildUser():User{
    const user = new User();
    user.email = this.formulaireInscription.get("emailInscription").value;
    user.name = this.formulaireInscription.get("nom").value;
    user.pseudo = this.formulaireInscription.get("pseudo").value;
    user.surname = this.formulaireInscription.get("prenom").value;
    user.hashpwd = this.formulaireInscription.get("motDePasseInscription").value;
    user.type = "0";
    return user;
  }



}
