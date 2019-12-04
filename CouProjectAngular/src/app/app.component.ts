import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { google } from '@agm/core/services/google-maps-types';
import {} from 'googlemaps';
import { GeocodeService } from './geocode.service';
import { Location } from './location-model';
import {Subscription} from 'rxjs';
import {AdresseService} from './Adresse/adresse.service';
import {Adresse} from './Adresse/Adresse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  private _adressList: Adresse[] = [];
  private subscriptions: Subscription[] = [];

  constructor(public adressService: AdresseService ) { }

  ngOnInit() {
    this.loadAdress();
  }

  loadAdress() {
    const sub = this.adressService.query().subscribe(listAdress => this.adressList = listAdress.map(adress => new Adresse().fromAdresseDto(adress)));
    this.subscriptions.push(sub);
  }


  get adressList(): Adresse[] {
    return this._adressList;
  }
  
  set adressList(value: Adresse[]) {
    this._adressList = value;
  }
}
