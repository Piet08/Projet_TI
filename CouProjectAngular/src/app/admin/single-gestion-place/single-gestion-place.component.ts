import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceAndAddressDto} from '../../views/lieu/place-dto';
import {Place} from '../../views/lieu/place';
import {Address} from '../../Address/address';
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-gestion-place',
  templateUrl: './single-gestion-place.component.html',
  styleUrls: ['./single-gestion-place.component.css']
})
export class SingleGestionPlaceComponent implements OnInit {

  @Output() private placeDeleted:EventEmitter<PlaceAndAddressDto> = new EventEmitter<PlaceAndAddressDto>();

  private _placeAndAddress:PlaceAndAddressDto={place:new Place().toLieuDto(),address:new Address().toAdresseDto(),avgRate:0};

  validation: boolean = false;

  constructor(private router:Router) { }

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

  navigateToDetailLieu() {
    this.router.navigate(['place/'+this.placeAndAddress.place.id]);
  }

  emitDeletePlace() {
    this.placeDeleted.next(this._placeAndAddress);
  }
}
