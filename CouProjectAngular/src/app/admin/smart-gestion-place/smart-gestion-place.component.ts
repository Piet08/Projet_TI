import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlaceService} from '../../views/lieu/place.service';
import {PlaceAndAddressDto} from '../../views/lieu/place-dto';
import {Subscription} from 'rxjs';
import {EnumTypeLieu} from '../../EnumTypeLieu';
import {Router} from '@angular/router';

@Component({
  selector: 'app-smart-gestion-place',
  templateUrl: './smart-gestion-place.component.html',
  styleUrls: ['./smart-gestion-place.component.css']
})
export class SmartGestionPlaceComponent implements OnInit,OnDestroy {

  private _placesAndAddresses:PlaceAndAddressDto[] = [];
  private subscriptions:Subscription[] = [];
  categoryFilter: EnumTypeLieu = EnumTypeLieu.ALL;
  sortFilter: number = 0;

  constructor(public lieuService:PlaceService) { }

  ngOnInit() {
    this.loadPlace();
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

  deletePlaceAndAddress($event: PlaceAndAddressDto) {
    this.subscriptions.push(
      this.lieuService.deleteWithCascade($event.place.id).subscribe(() => this.deleteRefOfPlace($event))
    );
  }

  private deleteRefOfPlace(place: PlaceAndAddressDto) {
    const indexArticleFound = this.placesAndAddresses.map(p => p.place.id).indexOf(place.place.id);

    if(indexArticleFound != -1){
      this.placesAndAddresses.splice(indexArticleFound, 1);
    }
  }
}
