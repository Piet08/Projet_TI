import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Place} from '../place';
import {ActivatedRoute} from '@angular/router';
import {PlaceService} from '../place.service';
import {Subscription} from 'rxjs';
import {Review} from '../../comment/review';
import {ReviewService} from '../../comment/review.service';

@Component({
  selector: 'app-detai-lieu',
  templateUrl: './detail-place.component.html',
  styleUrls: ['./detail-place.component.css']
})
export class DetailPlaceComponent implements OnInit,OnDestroy{
  private _place:Place;
  private _id:number;
  private subscriptions:Subscription[] = [];

  constructor(private route:ActivatedRoute, public lieuService:PlaceService,public reviewService:ReviewService) { }

  ngOnInit() {
    this._id = parseInt(this.route.snapshot.params['id'],10);
    this.loadPlace(this._id);
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
    this.subscriptions.push(sub);
  }

  createReview($event: Review) {
    $event.idPlace = this._id;
    console.log(JSON.stringify($event));
    this.subscriptions.push(this.reviewService.post($event.toAvisDto()).subscribe());
  }
}
