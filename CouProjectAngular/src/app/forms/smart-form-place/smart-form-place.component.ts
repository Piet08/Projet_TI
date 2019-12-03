import { Component, OnInit } from '@angular/core';
import {Address} from '../../Address/address';
import {AddressService} from '../../Address/address.service';
import {PlaceService} from '../../views/lieu/place.service';
import {Subscription} from 'rxjs';
import {Place} from '../../views/lieu/place';
import {PlaceAndAddressDto} from '../../views/lieu/place-dto';

@Component({
  selector: 'app-smart-form-lieu',
  templateUrl: './smart-form-place.component.html',
  styleUrls: ['./smart-form-place.component.css']
})
export class SmartFormPlaceComponent implements OnInit {
  private _adr:Address = new Address();
  constructor(public adrService:AddressService, public lieuService:PlaceService) { }
  private subscriptions:Subscription[] = [];

  ngOnInit() {
  }

  createPlace($event: PlaceAndAddressDto) {
    this.subscriptions.push(this.lieuService.post($event).subscribe());
  }
}
