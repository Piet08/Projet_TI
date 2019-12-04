import {Component, Input, OnInit} from '@angular/core';
import {Adresse} from '../Adresse/Adresse';

@Component({
  selector: 'app-list-adress',
  templateUrl: './list-adress.component.html',
  styleUrls: ['./list-adress.component.css']
})
export class ListAdressComponent implements OnInit{

  private _adressList: Adresse[] = [];

  constructor(){}

  ngOnInit(): void {
  }


  get adressList(): Adresse[] {
    return this._adressList;
  }

  @Input()
  set adressList(value: Adresse[]) {
    this._adressList = value;
  }
}
