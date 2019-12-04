import {Component, Input, OnInit} from '@angular/core';
import {Place, Places} from '../place';
import {PlaceService} from '../place.service';
import {Subscription} from 'rxjs';
import {Address} from '../../../Address/address';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-lieu',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.css']
})
export class ListPlaceComponent implements OnInit {
  _places: Places = [];
  private subscriptions:Subscription[] = [];

  constructor(public lieuService:PlaceService, private router:Router) { }

  ngOnInit() {
    this.loadLieux();
  }

  get places(): Place[] {
    return this._places;
  }

  @Input()
  set places(value: Place[]) {
    this._places = value;
  }

  private loadLieux() {
    const sub = this.lieuService.query().subscribe(
      lieux => this._places = lieux.map(lieu => new Place().fromLieuDto(lieu))
    );
    this.subscriptions.push(sub);
  }

  navigateToFormAddLieu() {
    this.router.navigate(['forms/lieux']);
  }
}
