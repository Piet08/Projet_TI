import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReviewAndUserDto, ReviewInsertDto} from '../../views/comment/review-insert-dto';
import {Review} from '../../views/comment/review';

@Component({
  selector: 'app-single-gestion-review',
  templateUrl: './single-gestion-review.component.html',
  styleUrls: ['./single-gestion-review.component.css']
})
export class SingleGestionReviewComponent implements OnInit {
  private _reviewAndUser: ReviewAndUserDto;
  validation: boolean = false;

  @Output() reviewDeleted:EventEmitter<ReviewInsertDto> = new EventEmitter<ReviewInsertDto>();

  constructor() { }

  ngOnInit() {
  }


  get reviewAndUser(): ReviewAndUserDto {
    return this._reviewAndUser;
  }
  @Input()
  set reviewAndUser(value: ReviewAndUserDto) {
    this._reviewAndUser = value;
  }

  emitDeleteReview() {
    this.reviewDeleted.next(this._reviewAndUser.review);
  }

}
