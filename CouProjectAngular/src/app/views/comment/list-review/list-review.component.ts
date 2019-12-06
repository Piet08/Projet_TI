import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Review, ReviewList} from '../review';
import {Subscription} from 'rxjs';
import {ReviewService} from '../review.service';
import {Place} from '../../lieu/place';
import {ActivatedRoute} from '@angular/router';
import {PlaceService} from '../../lieu/place.service';
import {ReviewAndUserDto} from '../review-insert-dto';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.css']
})
export class ListReviewComponent implements OnInit,OnDestroy{
  private _listReviewAndUser:ReviewAndUserDto[] = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  get listReviewAndUser(): ReviewAndUserDto[] {
    return this._listReviewAndUser;
  }
  @Input()
  set listReviewAndUser(value: ReviewAndUserDto[]) {
    this._listReviewAndUser = value;
  }


}
