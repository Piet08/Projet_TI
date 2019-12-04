import {Component, Input, OnInit} from '@angular/core';
import {Address} from '../Address/address';

@Component({
  selector: 'app-list-adress',
  templateUrl: './list-adress.component.html',
  styleUrls: ['./list-adress.component.css']
})
export class ListAdressComponent implements OnInit{

  private _addressList: Address[] = [];

  constructor(){}

  ngOnInit(): void {
  }


  get addressList(): Address[] {
    return this._addressList;
  }

  @Input()
  set addressList(value: Address[]) {
    this._addressList = value;
  }
}
