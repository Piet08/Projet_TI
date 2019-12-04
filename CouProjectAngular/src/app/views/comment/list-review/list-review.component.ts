import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
export class ListReviewComponent implements OnInit,OnDestroy{
  private _place:Place = new Place();
  private _listReview:ReviewList = [];
  private _id:number = -1;
  private subscriptions:Subscription[] = [];
  constructor(public avisService:ReviewService, private route:ActivatedRoute) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    console.log(this._id);
    this.loadReviewList(this._id);
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }


  get id(): number {
    return this._id;
  }
  // @Input()
  set id(value: number) {
    this._id = value;
  }

  get place(): Place {
    return this._place;
  }
  // @Input()
  set place(value: Place) {
    this._place = value;
  }

  get listReview(): Review[] {
    return this._listReview;
  }

  set listReview(value: Review[]) {
    this._listReview = value;
  }

  private loadReviewList(id:number) {
    const sub = this.avisService.getAvisFromAnUser(id).subscribe(
      listA => this._listReview = listA.map(a =>  new Review().fromAvisDto(a))
    );
    this.subscriptions.push(sub);
  }

}
