import {Component, OnDestroy, OnInit} from '@angular/core';
import {authenticateModelDto} from "../../../Utilisateur/authenticateModel-dto";
import {UtilisateurService} from "../../../Utilisateur/utilisateur.service";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {authenticateModel, authenticateModelList} from "../../../Utilisateur/authenticateModel";
import {Adresse} from "../../../Adresse/Adresse";

@Component({
  selector: 'app-smart-form-connection',
  templateUrl: './smart-form-connection.component.html',
  styleUrls: ['./smart-form-connection.component.css']
})
export class SmartFormConnectionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _usersConnected: authenticateModelList = [];

  constructor(public utilisateurService : UtilisateurService, private http: HttpClient) { }

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


  createUserConnected($event: authenticateModel) {
    console.log($event);
    const sub = this.utilisateurService.postAuth($event.toAuthenticateModelDto()).subscribe( authenticateModelDTO => this._usersConnected.push(new authenticateModel().fromAuthenticateModelDto(authenticateModelDTO)));
    this.subscriptions.push(sub);
  }
}
