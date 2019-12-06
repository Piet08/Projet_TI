import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Review} from '../review';
import {User} from '../../../User/user';
import {UserService} from '../../../User/user.service';
import {Subscription} from 'rxjs';
import {ReviewAndUserDto} from '../review-insert-dto';

@Component({
  selector: 'app-detail-comment',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit,OnDestroy{
  private _reviewAndUser:ReviewAndUserDto;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {}

  get reviewAndUser(): ReviewAndUserDto {
    return this._reviewAndUser;
  }
  @Input()
  set reviewAndUser(value: ReviewAndUserDto) {
    this._reviewAndUser = value;
  }

}
