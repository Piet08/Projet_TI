import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../place';
import {Address} from '../../../Address/address';
import {Router} from '@angular/router';
import {PlaceAndAddressDto} from '../place-dto';

@Component({
  selector: 'app-single-place',
  templateUrl: './single-place.component.html',
  styleUrls: ['./single-place.component.css']
})
export class SinglePlaceComponent implements OnInit {
  //Initialisation a null
  private _placeAndAddress:PlaceAndAddressDto={place:new Place().toLieuDto(),address:new Address().toAdresseDto(),avgRate:0};

  constructor() { }

  ngOnInit() {
  }

  get placeAndAddress(): PlaceAndAddressDto {
    return this._placeAndAddress;
  }
  @Input()
  set placeAndAddress(value: PlaceAndAddressDto) {
    if(value)
      this._placeAndAddress = value;
  }


}
