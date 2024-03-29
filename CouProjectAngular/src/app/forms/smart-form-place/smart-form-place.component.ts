import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PlaceService} from '../../views/lieu/place.service';
import {Subscription} from 'rxjs';
import {PlaceAndAddressDto} from '../../views/lieu/place-dto';
import {AuthenticateService} from '../../User/authenticate.service';

@Component({
  selector: 'app-smart-form-lieu',
  templateUrl: './smart-form-place.component.html',
  styleUrls: ['./smart-form-place.component.css']
})
export class SmartFormPlaceComponent implements OnInit,OnDestroy{

  constructor(public lieuService:PlaceService,public authService:AuthenticateService) { }
  private subscriptions:Subscription[] = [];

  ngOnInit() {
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  createPlace($event: PlaceAndAddressDto) {


    console.log(JSON.stringify($event));

    this.subscriptions.push(this.lieuService.postPlaceAndAddress($event).subscribe());
  }
}
