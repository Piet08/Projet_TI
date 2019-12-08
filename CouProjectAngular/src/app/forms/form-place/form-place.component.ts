import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnumTypeLieu, TYPE_LIEUX} from '../../EnumTypeLieu';
import {Place} from '../../views/lieu/place';
import {Address} from '../../Address/address';
import {PlaceAndAddressDto} from '../../views/lieu/place-dto';

@Component({
  selector: 'app-from-lieu',
  templateUrl: './form-place.component.html',
  styleUrls: ['./form-place.component.css']
})
export class FormPlaceComponent implements OnInit {

  @Output()
  placeCreated: EventEmitter<PlaceAndAddressDto> = new EventEmitter<PlaceAndAddressDto>();
  TYPE_LIEUX:EnumTypeLieu[] = TYPE_LIEUX;

  formLieu:FormGroup = this.fb.group({
    name : this.fb.control('',Validators.required),
    type : this.fb.control('',Validators.required),
    description : this.fb.control('',Validators.required),
    address:this.fb.group({
      straat : this.fb.control('',Validators.required),
      postalCode : this.fb.control('',[Validators.required,Validators.pattern(/^\d{4}$/)]),
      city : this.fb.control('',Validators.required),
      num : this.fb.control('',Validators.required)
    })
  });

  constructor(public fb:FormBuilder) { }

  ngOnInit() {
  }

  buildPlaceAndAddressDto(){
    const place = {
      place : this.buildPlace().toLieuDto(),
      address : this.buildAddress().toAdresseDto(),
      avgRate : 0
    }
    return place;
  }

  buildPlace(){
    const place = new Place();
    place.name = this.formLieu.get("name").value;
    place.type = this.formLieu.get("type").value;
    place.description = this.formLieu.get("description").value;
    return place;
  }

  buildAddress(){
    const address = new Address();
    address.city = this.formLieu.get("address.city").value;
    address.straat = this.formLieu.get("address.straat").value;
    address.num = this.formLieu.get("address.num").value;
    address.postalCode = this.formLieu.get("address.postalCode").value;
    return address;
  }

  emitNewLieu(){
    this.placeCreated.next(this.buildPlaceAndAddressDto());
    this.formLieu.reset();
  }

}
