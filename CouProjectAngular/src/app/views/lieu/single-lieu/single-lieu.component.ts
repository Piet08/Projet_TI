import {Component, Input, OnInit} from '@angular/core';
import {Lieu} from '../Lieu';
import {Adresse} from '../../../Adresse/Adresse';
import {AdresseService} from '../../../Adresse/adresse.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-lieu',
  templateUrl: './single-lieu.component.html',
  styleUrls: ['./single-lieu.component.css']
})
export class SingleLieuComponent implements OnInit {

  private _lieu:Lieu;
  private _adresse:Adresse = new Adresse();
  private _subscriptions:Subscription[] = [];

  constructor(public adrService:AdresseService,private router:Router) { }

  ngOnInit() {
  }

  get lieu(): Lieu {
    return this._lieu;
  }

  @Input()
  set lieu(value: Lieu) {
    this._lieu = value;
    this.updateAdresse(this._lieu.idadr);
  }

  get adresse(): Adresse {
    return this._adresse;
  }

  set adresse(value: Adresse) {
    this._adresse = value;
  }

  private updateAdresse(id:number) {
    const sub = this.adrService.get(id).subscribe(adr => this._adresse = new Adresse().fromAdresseDto(adr));
    this._subscriptions.push(sub);
  }

  onSingleLieuClick() {
    prompt("message");
  }

  navigateToDetailLieu() {
    this.router.navigate(['lieux/'+this.lieu.id]);
  }
}
