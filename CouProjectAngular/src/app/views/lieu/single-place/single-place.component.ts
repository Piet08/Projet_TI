import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../place';
import {Address} from '../../../Address/address';
import {AddressService} from '../../../Address/address.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-place',
  templateUrl: './single-place.component.html',
  styleUrls: ['./single-place.component.css']
})
export class SinglePlaceComponent implements OnInit {

  private _place:Place = new Place();
  private _address:Address = new Address();
  private _subscriptions:Subscription[] = [];

  constructor(public adrService:AddressService, private router:Router) { }

  ngOnInit() {
  }

  get place(): Place {
    return this._place;
  }

  @Input()
  set place(value: Place) {
    console.log(JSON.stringify(value));
    if(value) {
      this._place = value;
      this.updateAdresse(this._place.idAdr);
    }
  }

  get address(): Address {
    return this._address;
  }

  set address(value: Address) {
    this._address = value;
  }

  private updateAdresse(id:number) {
    const sub = this.adrService.get(id).subscribe(adr => this._address = new Address().fromAdresseDto(adr));
    this._subscriptions.push(sub);
  }

  onSingleLieuClick() {
    prompt("message");
  }

  navigateToDetailLieu() {
    this.router.navigate(['lieux/'+this.place.id]);
  }
}
