import {Component, Input, OnInit} from '@angular/core';
import {Lieu, Lieux} from '../Lieu';
import {LieuService} from '../lieu.service';
import {Subscription} from 'rxjs';
import {Adresse} from '../../../Adresse/Adresse';

@Component({
  selector: 'app-list-lieu',
  templateUrl: './list-lieu.component.html',
  styleUrls: ['./list-lieu.component.css']
})
export class ListLieuComponent implements OnInit {
  _lieux: Lieux = [];
  private subscriptions:Subscription[] = [];

  constructor(public lieuService:LieuService) { }

  ngOnInit() {
    this.loadLieux();
  }

  get lieux(): Lieu[] {
    return this._lieux;
  }

  @Input()
  set lieux(value: Lieu[]) {
    this._lieux = value;
  }

  private loadLieux() {
    const sub = this.lieuService.query().subscribe(
      lieux => this._lieux = lieux.map(lieu => new Lieu().fromLieuDto(lieu))
    );
    this.subscriptions.push(sub);
  }
}
