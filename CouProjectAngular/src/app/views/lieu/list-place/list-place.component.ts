import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlaceService} from '../place.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {PlaceAndAddressDto} from '../place-dto';
import {EnumTypeLieu} from '../../../EnumTypeLieu';

@Component({
  selector: 'app-list-lieu',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.css']
})
export class ListPlaceComponent implements OnInit,OnDestroy{
  private _placesAndAddresses:PlaceAndAddressDto[] = [];
  private subscriptions:Subscription[] = [];
  categoryFilter: EnumTypeLieu = EnumTypeLieu.ALL;
  sortFilter: number = 0;

  constructor(public lieuService:PlaceService, private router:Router) { }

  ngOnInit() {
    this.loadPlace();
    // this.lieuService.placeAndAddresses.subscribe(places => this._placesAndAddresses = places);
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  get placesAndAddresses(): PlaceAndAddressDto[] {
    return this._placesAndAddresses;
  }

  set placesAndAddresses(value: PlaceAndAddressDto[]) {
    this._placesAndAddresses = value;
  }

  private loadPlace() {
    const sub = this.lieuService.getPlacesAndAddressees().subscribe(
      places => {this._placesAndAddresses = places}
    );

    this.subscriptions.push(sub);
  }

  navigateToDetailLieu(placeAndAddress:PlaceAndAddressDto) {
    this.router.navigate(['place/'+placeAndAddress.place.id]);
  }

  navigateToFormAddLieu() {
    this.router.navigate(['forms/place']);
  }
}
