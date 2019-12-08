import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ReviewAndUserDto} from '../review-insert-dto';
import {Review} from '../review';
import {User} from '../../../User/user';
import {Router} from '@angular/router';
import {AuthenticateService} from '../../../User/authenticate.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.css']
})
export class SingleReviewComponent implements OnInit,OnDestroy{
  private _reviewAndUser:ReviewAndUserDto = {review:new Review().toAvisDto(),user:new User().toUtilisateurDto()};
  private currentUser:User;
  modification: boolean = false;
  rate: number = 0;

  @Output() reviewUpdated:EventEmitter<Review> = new EventEmitter<Review>();
  @Output() reviewDeleted:EventEmitter<number> = new EventEmitter<number>();

  formUpdate:FormGroup = this.fb.group({
    comment : this.fb.control('',Validators.required),
    star : this.fb.control('',Validators.required)
  })

  constructor(private router:Router,public authService:AuthenticateService,public fb:FormBuilder) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      user => this.currentUser = user
    )
  }

  ngOnDestroy(): void {}

  get reviewAndUser(): ReviewAndUserDto {
    return this._reviewAndUser;
  }
  @Input()
  set reviewAndUser(value: ReviewAndUserDto) {
    this._reviewAndUser = value;
    this.rate = this._reviewAndUser.review.star;
  }

  setModification(value : boolean){
    if(value){
      this.formUpdate.get('star').setValue(this.reviewAndUser.review.star);
      this.formUpdate.get('comment').setValue(this.reviewAndUser.review.comment);
    }
    this.modification = value;
  }

  navigateToDetailUser() {
    this.router.navigate(['user/'+this._reviewAndUser.user.id]);
  }

  buildReview() : Review{
    var review = new Review().fromAvisDto(this._reviewAndUser.review)
    review.comment = this.formUpdate.get("comment").value;
    review.star = this.formUpdate.get("star").value;
    review.date = new DatePipe('en-US').transform(new Date(),'dd-MM-yy HH:mm:ss');
    return review;
  }

  emitReviewUpdated() {
    this.reviewUpdated.next(this.buildReview());
    this.modification = false;
  }

  emitReviewDeleted() {
    this.reviewDeleted.next(this._reviewAndUser.review.id);
  }
}
