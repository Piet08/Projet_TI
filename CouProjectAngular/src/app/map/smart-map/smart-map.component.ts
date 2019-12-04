import {Component, Input, OnInit, Output} from '@angular/core';
import {Location} from '../../location-model';
import {Address, AddressList} from '../../Address/address';
import {GeocodeService} from '../../geocode.service';
import {AddressService} from '../../Address/address.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-smart-map',
  templateUrl: './smart-map.component.html',
  styleUrls: ['./smart-map.component.css']
})
export class SmartMapComponent implements OnInit {

  private _markers: marker[] = [];
  private _addressList: Address[] = [];
  private _location: Location;
  private subscriptions: Subscription[] = [];

  constructor(public geocodeService: GeocodeService, public addressService: AddressService) { }

   ngOnInit() {
    this.loadAllAdress();
  }

  //Convertit la liste d'adresses en markers pour les envoyer au dump-map qui les afficheras
  loadAllAdressToMarkers(){
    for (let i = 0; i < this.addressList.length; i++) {
      this.geocodeService.geocodeAddress(this.addressList[i].city + ", " + this.addressList[i].straat + " N° " + this.addressList[i].num + ", " + this.addressList[i].postalCode)
        .subscribe((location: Location) =>
          {
            this.location = location;
            this._markers.push(
              {
                lat: this.location.lat,
                lng: this.location.lng,
                label: this.addressList[i].city + ", " + this.addressList[i].straat + " N° " + this.addressList[i].num + ", " + this.addressList[i].postalCode,
                id: this.addressList[i].id
              }
            );
          }
        );
    }
  }

  //Contacte l'API pour récupérer toutes les adresses contenues dans la bdd
  loadAllAdress(){
    const sub = this.addressService.query().subscribe(listAddress =>
    {
      this.addressList = listAddress.map(address => new Address().fromAdresseDto(address));
      this.loadAllAdressToMarkers();
    });
    this.subscriptions.push(sub);
  }

  get markers(): marker[] {
    return this._markers;
  }

  set markers(value: marker[]) {
    this._markers = value;
  }

  get addressList(): Address[] {
    return this._addressList;
  }

  set addressList(value: Address[]) {
    this._addressList = value;
  }

  get location(): Location {
    return this._location;
  }

  set location(value: Location) {
    this._location = value;
  }

  test() {
    console.log(this.markers)
  }
}
