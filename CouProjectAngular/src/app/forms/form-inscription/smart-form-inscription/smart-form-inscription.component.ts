import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {User, UserList} from "../../../User/user";
import {Address, AddressList} from "../../../Address/address";
import {UserService} from "../../../User/user.service";
import {AddressService} from "../../../Address/address.service";

@Component({
  selector: 'app-smart-form-inscription',
  templateUrl: './smart-form-inscription.component.html',
  styleUrls: ['./smart-form-inscription.component.css']
})
export class SmartFormInscriptionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _users: UserList = [];
  private _adresses: AddressList = [];

  constructor(public userService: UserService, public adresseService : AddressService,  private http: HttpClient) { }

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



  createAdressUser($event: Address) {
   const sub = this.adresseService.post($event.toAdresseDto()).subscribe( adresseDTO => this._adresses.push(new Address().fromAdresseDto(adresseDTO)));
    this.subscriptions.push(sub);
  }

  createUser($event: User) {
    const sub = this.userService.post($event.toUtilisateurDto()).subscribe( userDTO => this._users.push(new User().fromUtilisateurDto(userDTO)));
    this.subscriptions.push(sub);
  }
}
