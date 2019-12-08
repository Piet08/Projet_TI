import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Location} from '../location-model';
import {Address, AddressList} from '../../Address/address';
import {GeocodeService} from '../geocode.service';
import {AddressService} from '../../Address/address.service';
import {Subscription} from 'rxjs';
import {Place} from '../../views/lieu/place';
import {PlaceService} from '../../views/lieu/place.service';
import {PlaceAndAddressDto} from '../../views/lieu/place-dto';
import {LocationUserServiceService} from '../location-user-service.service';

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
  private _tmpUserLocation: Location;
  private _userLocation: Location;


  constructor(private geocodeService: GeocodeService, private placeService : PlaceService, private locationUserService : LocationUserServiceService) { }

   ngOnInit() {
    this.loadLocationUser(() => {
      this.locationUserService.getCurrentPosition().subscribe((position: Position) => {
          localStorage.setItem("lat",position.coords.latitude.toString());
          localStorage.setItem("lng",position.coords.longitude.toString());
        }
      );
    });
    this.userLocation = {lat:parseFloat(localStorage.getItem("lat")),lng:parseFloat(localStorage.getItem("lng"))}
    this.loadPlaceAndAddress((places) => this.loadAllAdressToMarkers(places)); // callback
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
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
          if(location.lat != 0 && location.lng != 0) {
          this.markers.push(
            {
              idAdr: placeAndAddress[i].address.id,
              lat: this.location.lat,
              lng: this.location.lng,
              num: placeAndAddress[i].address.num,
              postalCode: placeAndAddress[i].address.postalCode,
              straat: placeAndAddress[i].address.straat,
              city: placeAndAddress[i].address.city,
              label_address: placeAndAddress[i].address.city + ", " + placeAndAddress[i].address.straat + " N° " + placeAndAddress[i].address.num + ", " + placeAndAddress[i].address.postalCode,
              idPlace: this._placeAndAddress[i].place.id,
              name: tmpPlace.name,
              type: tmpPlace.type,
              description: tmpPlace.description,
              rating: placeAndAddress[i].avgRate,
              distanceUser: 0
            }
          );}
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

  loadLocationUser(fn){
    this.tmpUserLocation = fn();
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


  get tmpUserLocation(): Location {
    return this._tmpUserLocation;
  }

  @Input()
  set tmpUserLocation(value: Location) {
    this._tmpUserLocation = value;
  }


  get userLocation(): Location {
    return this._userLocation;
  }

  @Input()
  set userLocation(value: Location) {
    this._userLocation = value;
  }
}
