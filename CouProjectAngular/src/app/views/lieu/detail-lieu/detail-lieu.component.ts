import {Component, Input, OnInit} from '@angular/core';
import {Lieu} from '../Lieu';
import {ActivatedRoute} from '@angular/router';
import {LieuService} from '../lieu.service';

@Component({
  selector: 'app-detai-lieu',
  templateUrl: './detail-lieu.component.html',
  styleUrls: ['./detail-lieu.component.css']
})
export class DetailLieuComponent implements OnInit {
  private _lieu:Lieu;
  private _id:number;
  constructor(private route:ActivatedRoute, public lieuService:LieuService) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.loadLieu(this._id);
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get lieu(): Lieu {
    return this._lieu;
  }

  @Input()
  set lieu(value: Lieu) {
    this._lieu = value;
  }

  private loadLieu(id: number) {
    const sub = this.lieuService.get(id).subscribe( lieu => this._lieu = new Lieu().fromLieuDto(lieu));
  }
}
