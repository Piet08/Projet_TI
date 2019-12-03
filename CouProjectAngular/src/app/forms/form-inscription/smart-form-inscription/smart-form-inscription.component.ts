import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilisateurService} from "../../../Utilisateur/utilisateur.service";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Adresse, AdresseList} from "../../../Adresse/Adresse";
import {Utilisateur, UtilisateurList} from "../../../Utilisateur/Utilisateur";
import {Subscription} from "rxjs";
import {AdresseService} from "../../../Adresse/adresse.service";

@Component({
  selector: 'app-smart-form-inscription',
  templateUrl: './smart-form-inscription.component.html',
  styleUrls: ['./smart-form-inscription.component.css']
})
export class SmartFormInscriptionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _users: UtilisateurList = [];
  private _adresses: AdresseList = [];

  constructor(public utilisateurService: UtilisateurService, public adresseService : AdresseService,  private http: HttpClient) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      //IF subscription EXISTE
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }



  createAdressUser($event: Adresse) {
   const sub = this.adresseService.post($event.toAdresseDto()).subscribe( adresseDTO => this._adresses.push(new Adresse().fromAdresseDto(adresseDTO)));
    this.subscriptions.push(sub);
  }

  createUser($event: Utilisateur) {
    const sub = this.utilisateurService.post($event.toUtilisateurDto()).subscribe( userDTO => this._users.push(new Utilisateur().fromUtilisateurDto(userDTO)));
    this.subscriptions.push(sub);
  }
}
