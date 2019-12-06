import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Location} from '../location-model';
import {Address, AddressList} from '../../Address/address';
import {GeocodeService} from '../geocode.service';
import {AddressService} from '../../Address/address.service';
import {Subscription} from 'rxjs';
import {Place} from '../../views/lieu/place';
import {PlaceService} from '../../views/lieu/place.service';
import {PlaceAndAddressDto} from '../../views/lieu/place-dto';

@Component({
  selector: 'app-smart-map',
  templateUrl: './smart-map.component.html',
  styleUrls: ['./smart-map.component.css']
})
export class SmartMapComponent implements OnInit, OnDestroy {

  private _markers: marker[] = [];
  private _placeAndAddress: PlaceAndAddressDto[] = [];
  private subscriptions: Subscription[] = [];
  private _location: Location;
  private _places: Place [] = [];


  constructor(public geocodeService: GeocodeService, /*public addressService: AddressService, */public placeService : PlaceService) { }

   ngOnInit() {
    this.loadPlaceAndAddress((places) => this.loadAllAdressToMarkers(places)); // callback
  }

  ngOnDestroy(): void {

  }

  //Convertit la liste d'adresses en markers pour les envoyer au dump-map qui les afficheras
  loadAllAdressToMarkers(placeAndAddress: PlaceAndAddressDto[]) {
    for (let i = 0; i < placeAndAddress.length; i++) {
      let tmpDto = placeAndAddress[i].place;
      let tmpPlace = new Place(tmpDto.id,tmpDto.name,tmpDto.type,tmpDto.description,tmpDto.idAdr);
      this.places.push(tmpPlace);
      this.geocodeService.geocodeAddress(placeAndAddress[i].address.city + ", " + placeAndAddress[i].address.straat + " N° " + placeAndAddress[i].address.num + ", " + placeAndAddress[i].address.postalCode)
        .subscribe((location: Location) => {
          this.location = location;
          this.markers.push(
            {
              lat: this.location.lat,
              lng: this.location.lng,
              label_address: this.placeAndAddress[i].address.city + ", " + placeAndAddress[i].address.straat + " N° " + placeAndAddress[i].address.num + ", " + placeAndAddress[i].address.postalCode,
              id: this.placeAndAddress[i].place.id,
              name: tmpPlace.name,
              type: tmpPlace.type,
              description: tmpPlace.description
            }
          );
        }

    );
    }
  }

  loadPlaceAndAddress(fn){
    const sub = this.placeService
      .queryMap()
      .subscribe(placeAndAddress => {
        this._placeAndAddress = placeAndAddress;
        fn(placeAndAddress);
      });
    this.subscriptions.push(sub);
  }


  get markers(): marker[] {
    return this._markers;
  }

  @Input()
  set markers(value: marker[]) {
    this._markers = value;
  }


  get location(): Location {
    return this._location;
  }

  set location(value: Location) {
    this._location = value;
  }


  get placeAndAddress(): PlaceAndAddressDto[] {
    return this._placeAndAddress;
  }

  set placeAndAddress(value: PlaceAndAddressDto[]) {
    this._placeAndAddress = value;
  }


  get places(): Place[] {
    return this._places;
  }

  @Input()
  set places(value: Place[]) {
    this._places = value;
  }
}
