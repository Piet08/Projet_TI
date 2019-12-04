import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../location-model';
import {GeocodeService} from '../geocode.service';
import {Address} from '../Address/address';
import {} from 'googlemaps';
import StyledMapType = google.maps.StyledMapType;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
    markers: marker[] = [];
    private _addressList: Address[] = [];

    location: Location;


    async ngOnInit(){
      await this.loadingMap(300); // permet de charger la carte pour y charger les markers de la bdd
      this.addressToCoordinates();
    }


  constructor(private geocodeService: GeocodeService) {

  }


  test(){
    this.addressToCoordinates()
  }

  addressToCoordinates() {

    for (let i = 0; i < this.addressList.length; i++) {
      this.geocodeService.geocodeAddress(this.addressList[i].city + ", " + this.addressList[i].straat + " N° " + this.addressList[i].num + ", " + this.addressList[i].postalCode)
        .subscribe((location: Location) =>
          {
            this.location = location;
            console.log(this.location);
            this.markers.push(
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

  loadingMap(ms: number){
      return new Promise(resolve => setTimeout(resolve,ms));
  }


  get addressList(): Address[] {
    return this._addressList;
  }

  @Input()
  set addressList(value: Address[]) {
    this._addressList = value;
  }


  sayCoucouFromMarker(label: string, id: number, lat:number, lng:number) {
    console.log("coucou")
    // console.log("Coucou de " + label + " " + id + " LAT : " + lat + " LONG : " + lng );
  }
}
