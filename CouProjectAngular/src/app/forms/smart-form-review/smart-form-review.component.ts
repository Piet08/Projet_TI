import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ReviewService} from '../../views/comment/review.service';
import {Subscription} from 'rxjs';
import {Review} from '../../views/comment/review';

@Component({
  selector: 'app-smart-form-review',
  templateUrl: './smart-form-review.component.html',
  styleUrls: ['./smart-form-review.component.css']
})
export class SmartFormReviewComponent implements OnInit,OnDestroy{

  @Output() private _reviewCreated: EventEmitter<Review> = new EventEmitter<Review>();

  private subscriptions:Subscription[] = []
  constructor(public reviewService:ReviewService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  get reviewCreated(): EventEmitter<Review> {
    return this._reviewCreated;
  }

  set reviewCreated(value: EventEmitter<Review>) {
    this._reviewCreated = value;
  }

  createReview($event: Review) {
    // this.subscriptions.push(this.reviewService.post($event.toAvisDto()).subscribe(review => this._reviewCreated.next(new Review().fromAvisDto(review))));
    this._reviewCreated.next($event);
  }
}
