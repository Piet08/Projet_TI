import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utilisateur} from "../../../Utilisateur/Utilisateur";
import {UtilisateurService} from "../../../Utilisateur/utilisateur.service";
import {Adresse} from "../../../Adresse/Adresse";


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
    motDePasse: this.fb.control("", Validators.required),
    verifMotDePasse: this.fb.control("", Validators.required),
    numero: this.fb.control("", Validators.required),
    rue: this.fb.control("", Validators.required),
    codePostal: this.fb.control("", Validators.required),
    ville: this.fb.control("", Validators.required)
  });

  @Output()
  userCreated:EventEmitter<Utilisateur> = new EventEmitter<Utilisateur>();
  @Output()
  adressCreated:EventEmitter<Adresse> = new EventEmitter<Adresse>();


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



  private buildAdressUser():Adresse{
    const adress = new Adresse();
    adress.ville = this.formulaireInscription.get("ville").value;
    adress.rue = this.formulaireInscription.get("rue").value;
    adress.num = this.formulaireInscription.get("num").value;
    adress.cp = this.formulaireInscription.get("codePostal").value;
    return adress;
  }

  private buildUser():Utilisateur{
    const user = new Utilisateur();
    user.email = this.formulaireInscription.get("emailInscription").value;
    user.nom = this.formulaireInscription.get("nom").value;
    user.prenom = this.formulaireInscription.get("prenom").value;
    user.hashpwd = this.formulaireInscription.get("motDePasse").value;
    user.type = "0";
    return user;
  }



}
