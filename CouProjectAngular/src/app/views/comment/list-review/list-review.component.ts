import {Component, Input, OnInit} from '@angular/core';
import {Review, ReviewList} from '../review';
import {Subscription} from 'rxjs';
import {ReviewService} from '../review.service';
import {Place} from '../../lieu/place';
import {ActivatedRoute} from '@angular/router';
import {PlaceService} from '../../lieu/place.service';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.css']
})
export class ListReviewComponent implements OnInit {
  private _lieu:Place = new Place();
  private _listAvis:ReviewList = [];
  private _id:number = -1;
  private subscriptions:Subscription[] = [];
  constructor(public avisService:ReviewService, private route:ActivatedRoute, public lieuService:PlaceService) { }

  ngOnInit() {
    // this._id = this.route.snapshot.params['id'];
    this.loadAvisList(this._id);
    // this.loadLieu(this._id);
  }


  get id(): number {
    return this._id;
  }
  @Input()
  set id(value: number) {
    this._id = value;
  }

  get lieu(): Place {
    return this._lieu;
  }
  @Input()
  set lieu(value: Place) {
    this._lieu = value;
  }

  get listAvis(): Review[] {
    return this._listAvis;
  }

  set listAvis(value: Review[]) {
    this._listAvis = value;
  }

  private loadAvisList(id:number) {
    const sub = this.avisService.getAvisFromAnUser(id).subscribe(
      listA => this._listAvis = listA.map(a =>  new Review().fromAvisDto(a))
    );
  }

  private loadLieu(id: number) {
    const sub = this.lieuService.get(id).subscribe( lieu => this._lieu = new Place().fromLieuDto(lieu));
  }
}
