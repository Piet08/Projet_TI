import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import { GeocodeService } from './geocode.service';
import { Location } from './location-model';
import {Subscription} from 'rxjs';
import {AddressService} from './Address/address.service';
import {Address} from './Address/address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cou_Project';
  currentJustify = 'justified';
  isCollapsed: boolean = true;

  private _addressList: Address[] = [];
  private subscriptions: Subscription[] = [];

  constructor(public adressService: AddressService ) { }

  ngOnInit() {
    //this.loadAdress();
  }

  loadAdress() {
    const sub = this.adressService.query().subscribe(listAdress => this.addressList = listAdress.map(adress => new Address().fromAdresseDto(adress)));
    this.subscriptions.push(sub);
  }


  get addressList(): Address[] {
    return this._addressList;
  }

  set addressList(value: Address[]) {
    this._addressList = value;
  }
}
