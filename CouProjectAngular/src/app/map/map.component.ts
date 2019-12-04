import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../location-model';
import {GeocodeService} from '../geocode.service';
import {AdresseService} from '../Adresse/adresse.service';
import {Adresse} from '../Adresse/Adresse';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
    markers: marker[] = [];
    private _adressList: Adresse[] = [];

    location: Location;


    async ngOnInit(){
      this.addressToCoordinates();
    }


  constructor(private geocodeService: GeocodeService) {

  }


  test(){
    this.addressToCoordinates()
  }

  addressToCoordinates() {

    for (let i = 0; i < this.adressList.length; i++) {
      this.geocodeService.geocodeAddress(this.adressList[i].ville + ", " + this.adressList[i].rue + " N° " + this.adressList[i].num + ", " + this.adressList[i].cp)
        .subscribe((location: Location) =>
          {
            this.location = location;
            console.log(this.location);
            this.markers.push(
              {
                lat: this.location.lat,
                lng: this.location.lng,
                label: this.adressList[i].ville + ", " + this.adressList[i].rue + " N° " + this.adressList[i].num + ", " + this.adressList[i].cp,
                id: this.adressList[i].id
              }
            );
          }
        );
    }

  }

  loadingMap(ms: number){
      return new Promise(resolve => setTimeout(resolve,ms));
  }


  get adressList(): Adresse[] {
    return this._adressList;
  }

  @Input()
  set adressList(value: Adresse[]) {
    this._adressList = value;
  }


  sayCoucouFromMarker(label: string, id: number) {
    console.log("Coucou de " + label + " " + id);
  }
}

interface marker {
  lat: number;
  lng: number;
  label: string;
  id: number;
}
