import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {User, UserList} from "../../../User/user";
import {Address, AddressList} from "../../../Address/address";
import {UserService} from "../../../User/user.service";
import {AddressService} from "../../../Address/address.service";
import {PlaceAndAddressDto} from "../../../views/lieu/place-dto";
import {UserAndAddressDto} from "../../../User/user-dto";

@Component({
  selector: 'app-smart-form-inscription',
  templateUrl: './smart-form-inscription.component.html',
  styleUrls: ['./smart-form-inscription.component.css']
})
export class SmartFormInscriptionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(public userService: UserService,  private http: HttpClient) { }

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


  createUser($event: UserAndAddressDto) {
    this.subscriptions.push(this.userService.post($event).subscribe());
  }

}
