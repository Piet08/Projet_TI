import { Component, OnInit } from '@angular/core';
import {ReviewService} from '../../views/comment/review.service';
import {Subscription} from 'rxjs';
import {Review} from '../../views/comment/review';

@Component({
  selector: 'app-smart-form-review',
  templateUrl: './smart-form-review.component.html',
  styleUrls: ['./smart-form-review.component.css']
})
export class SmartFormReviewComponent implements OnInit {


  private subscriptions:Subscription[] = []
  constructor(public reviewService:ReviewService) { }

  ngOnInit() {
  }

  createReview($event: Review) {
    this.subscriptions.push(this.reviewService.post($event.toAvisDto()).subscribe());
  }
}
