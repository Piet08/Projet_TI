import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReviewWithPlaceAndAddressDto} from '../review-insert-dto';
import {Router} from '@angular/router';
import {User} from '../../../User/user';
import {AuthenticateService} from '../../../User/authenticate.service';
import {Review} from '../review';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-detail-review',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit {
  private _review:ReviewWithPlaceAndAddressDto;
  currentUser: User;
  private modification:boolean = false;
  rate: number = 0;

  @Output() reviewUpdated:EventEmitter<Review> = new EventEmitter<Review>();
  @Output() reviewDeleted:EventEmitter<number> = new EventEmitter<number>();

  formUpdate:FormGroup = this.fb.group({
    comment : this.fb.control('',Validators.required),
    star : this.fb.control('',Validators.required)
  })

  constructor(private router:Router,public authService:AuthenticateService,public fb:FormBuilder) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user=>this.currentUser=user);
  }

  get review(): ReviewWithPlaceAndAddressDto {
    return this._review;
  }
  @Input()
  set review(value: ReviewWithPlaceAndAddressDto) {
    this._review = value;
  }

  setModification(value : boolean){
    if(value){
      this.formUpdate.get('star').setValue(this.review.review.star);
      this.formUpdate.get('comment').setValue(this.review.review.comment);
    }
    this.modification = value;
  }

  buildReview() : Review{
    var review = new Review().fromAvisDto(this.review.review)
    review.comment = this.formUpdate.get("comment").value;
    review.star = this.formUpdate.get("star").value;
    review.date = new DatePipe('en-US').transform(new Date(),'dd-MM-yy HH:mm:ss');
    return review;
  }

  emitReviewUpdated() {
    this.reviewUpdated.next(this.buildReview());
    this.modification = false;
  }

  navigateToPlace() {
    this.router.navigate(['place/'+this.review.placeAndAddress.place.id]);
  }

  emitReviewDeleted() {
    this.reviewDeleted.next(this.review.review.id);
  }
}
