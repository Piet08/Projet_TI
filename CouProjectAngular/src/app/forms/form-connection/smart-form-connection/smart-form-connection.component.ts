import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {authenticateModel, authenticateModelList} from "../../../User/authenticateModel";
import {UserService} from "../../../User/user.service";
import {User} from "../../../User/user";
import {authenticateModelDto} from "../../../User/authenticateModel-dto";

@Component({
  selector: 'app-smart-form-connection',
  templateUrl: './smart-form-connection.component.html',
  styleUrls: ['./smart-form-connection.component.css']
})
export class SmartFormConnectionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _usersAuthenticate: authenticateModelList = [];


  constructor(public userService : UserService, private http: HttpClient) { }

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
    const sub = this.userService.postAuth($event.toAuthenticateModelDto()).subscribe(
      authenticateModelDTO =>{
        this._usersAuthenticate.push(new authenticateModel().fromAuthenticateModelDto(authenticateModelDTO));
        this._usersAuthenticate.forEach(use => localStorage.setItem("id_token", use.token));
        this.isAdmin(this._usersAuthenticate);
      });
    this.subscriptions.push(sub);

  }

  //Méthode qui récup le type de l'utilisateur qui se connecte et check si admin ! A partir de la tu fais ce que tu veux ;)

  isAdmin(auth : authenticateModelList){
    var typeAuth;
    auth.forEach(use =>  typeAuth = use.type);
    if(typeAuth == 1){
      alert("Bienvenue administrateur");
    }
  }



}
