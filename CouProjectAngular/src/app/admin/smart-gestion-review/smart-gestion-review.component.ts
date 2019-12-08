import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ReviewAndUserDto, ReviewInsertDto} from '../../views/comment/review-insert-dto';
import {ReviewService} from '../../views/comment/review.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PlaceAndAddressDto} from '../../views/lieu/place-dto';
import {Address} from '../../Address/address';
import {Place} from '../../views/lieu/place';
import {PlaceService} from '../../views/lieu/place.service';
import {Review} from '../../views/comment/review';

@Component({
  selector: 'app-smart-gestion-review',
  templateUrl: './smart-gestion-review.component.html',
  styleUrls: ['./smart-gestion-review.component.css']
})
export class SmartGestionReviewComponent implements OnInit,OnDestroy{
  private _placeAndAddress:PlaceAndAddressDto = {place:new Place().toLieuDto(),address:new Address().toAdresseDto(),avgRate:0};
  private _listReviewAndUser:ReviewAndUserDto[] = [];
  private subscriptions: Subscription[] = [];
  private _id: number;

  constructor(public reviewService:ReviewService,private route:ActivatedRoute,public placeService:PlaceService) { }

  ngOnInit() {
    this._id = parseInt(this.route.snapshot.params['id'],10);
    this.loadReviewAndUser(this._id);
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

  get placeAndAddress(): PlaceAndAddressDto {
    return this._placeAndAddress;
  }

  set placeAndAddress(value: PlaceAndAddressDto) {
    this._placeAndAddress = value;
  }

  get listReviewAndUser(): ReviewAndUserDto[] {
    return this._listReviewAndUser;
  }

  set listReviewAndUser(value: ReviewAndUserDto[]) {
    this._listReviewAndUser = value;
  }

  loadReviewAndUser(id:number){
    this.subscriptions.push(
      this.reviewService.getReviewsAndUserFromAPlace(id).subscribe(reviews => this._listReviewAndUser = reviews)
    );
  }

  private loadPlace(id: number) {
    this.subscriptions.push(
      this.placeService.getPlaceAndAddress(id).subscribe(place => {this._placeAndAddress = place})
    );
  }

  deleteReview($event: ReviewInsertDto) {
    this.subscriptions.push(
      this.reviewService.delete($event.id).subscribe(() => this.deleteRefOfReview($event))
    );
  }

  private deleteRefOfReview(review : ReviewInsertDto) {
    const indexArticleFound = this._listReviewAndUser.map(r => r.review.id).indexOf(review.id);

    if(indexArticleFound != -1){
      this.listReviewAndUser.splice(indexArticleFound, 1);
    }
  }

}
