import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../place';
import {ActivatedRoute} from '@angular/router';
import {PlaceService} from '../place.service';

@Component({
  selector: 'app-detai-lieu',
  templateUrl: './detail-place.component.html',
  styleUrls: ['./detail-place.component.css']
})
export class DetailPlaceComponent implements OnInit {
  private _place:Place;
  private _id:number;
  constructor(private route:ActivatedRoute, public lieuService:PlaceService) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.loadPlace(this._id);
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get place(): Place {
    return this._place;
  }

  @Input()
  set place(value: Place) {
    this._place = value;
  }

  private loadPlace(id: number) {
    const sub = this.lieuService.get(id).subscribe( lieu => this._place = new Place().fromLieuDto(lieu));
  }
}
