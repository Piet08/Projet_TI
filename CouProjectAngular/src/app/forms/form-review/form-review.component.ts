import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Review} from '../../views/comment/review';

@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.css']
})
export class FormReviewComponent implements OnInit {
  private _rate:number = 0;
  private _hovered:number = 0;

  @Output()
  reviewCreated: EventEmitter<Review> = new EventEmitter<Review>();

  formReview:FormGroup = this.fb.group({
    comment : this.fb.control(''),
    star : this.fb.control(null,Validators.required)
  });

  constructor(public fb:FormBuilder) { }

  ngOnInit() {
  }

  get rate(): number {
    return this._rate;
  }
  set rate(value: number) {
    this._rate = value;
  }
  get hovered(): number {
    return this._hovered;
  }

  set hovered(value: number) {
    this._hovered = value;
  }

  buildReview(){
    const review = new Review();
    review.star = this._rate;
    review.comment = this.formReview.get("comment").value;
    review.idPlace = 5;
    review.idUser = 2;
    return review;
  }

  emitNewReview() {
    this.reviewCreated.next(this.buildReview());
  }

  getValueOfControl(controlName:string) : number{
    return this.formReview.controls[controlName].value;
  }


}