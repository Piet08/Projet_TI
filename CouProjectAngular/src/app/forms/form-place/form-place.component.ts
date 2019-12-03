import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnumTypeLieu} from '../../EnumTypeLieu';
import {Place} from '../../views/lieu/place';
import {Address} from '../../Address/address';
import {PlaceService} from '../../views/lieu/place.service';
import {Subscription} from 'rxjs';
import {AddressService} from '../../Address/address.service';
import {PlaceAndAddressDto} from '../../views/lieu/place-dto';

@Component({
  selector: 'app-from-lieu',
  templateUrl: './form-place.component.html',
  styleUrls: ['./form-place.component.css']
})
export class FormPlaceComponent implements OnInit {

  @Output()
  placeCreated: EventEmitter<PlaceAndAddressDto> = new EventEmitter<PlaceAndAddressDto>();

  typeLieu:EnumTypeLieu[] = [EnumTypeLieu.FAST_FOOD,EnumTypeLieu.MUSEE,EnumTypeLieu.MAGASIN
  ,EnumTypeLieu.BAR,EnumTypeLieu.BRASSERIE,EnumTypeLieu.DIVERTISSEMENT,EnumTypeLieu.RESTAURANT];

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
  })

  private subscriptions: Subscription[] = [];
  constructor(public fb:FormBuilder) { }

  ngOnInit() {
  }

  buildPlaceAndAddressDto(){
    const place = {
      place : this.buildLieu().toLieuDto(),
      address : this.buildAdresse().toAdresseDto()
    }
    return place;
  }

  buildLieu(){
    const lieu = new Place();
    lieu.name = this.formLieu.get("name").value;
    lieu.type = this.formLieu.get("type").value;
    lieu.description = this.formLieu.get("description").value;
    return lieu;
  }

  buildAdresse(){
    const address = new Address();
    address.city = this.formLieu.get("address.city").value;
    address.straat = this.formLieu.get("address.straat").value;
    address.num = this.formLieu.get("address.num").value;
    address.postalCode = this.formLieu.get("address.postalCode").value;
    return address;
  }

  emitNewLieu(){
    this.placeCreated.next(this.buildPlaceAndAddressDto());
  }

}
