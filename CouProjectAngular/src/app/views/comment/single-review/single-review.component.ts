import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ReviewAndUserDto} from '../review-insert-dto';
import {Review} from '../review';
import {User} from '../../../User/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.css']
})
export class SingleReviewComponent implements OnInit,OnDestroy{
  private _reviewAndUser:ReviewAndUserDto = {review:new Review().toAvisDto(),user:new User().toUtilisateurDto()};

  constructor(private router:Router) { }

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

  navigateToDetailUser() {
    this.router.navigate(['user/'+this._reviewAndUser.user.id]);
  }
}
