import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Place} from '../place';
import {ActivatedRoute} from '@angular/router';
import {PlaceService} from '../place.service';
import {Subscription} from 'rxjs';
import {Review} from '../../comment/review';
import {ReviewService} from '../../comment/review.service';
import {ReviewAndUserDto} from '../../comment/review-insert-dto';
import {User} from '../../../User/user';
import {PlaceAndAddressDto} from '../place-dto';

@Component({
  selector: 'app-detai-lieu',
  templateUrl: './detail-place.component.html',
  styleUrls: ['./detail-place.component.css']
})
export class DetailPlaceComponent implements OnInit,OnDestroy{
  private _place:Place;
  private _placeAndAddress:PlaceAndAddressDto;
  private _id:number;
  private subscriptions:Subscription[] = [];
  private _listReviewAndUser: ReviewAndUserDto[];

  constructor(private route:ActivatedRoute, public lieuService:PlaceService,public reviewService:ReviewService) { }

  ngOnInit() {
    this._id = parseInt(this.route.snapshot.params['id'],10);
    this.loadPlace(this._id);
    this.loadReviewOfPlace(this._id);
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  get placeAndAddress(): PlaceAndAddressDto {
    return this._placeAndAddress;
  }

  set placeAndAddress(value: PlaceAndAddressDto) {
    this._placeAndAddress = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get place(): Place {
    return this._place;
  }

  @Input()
  set place(value: Place) {
    this._place = value;
  }

  get listReviewAndUser(): ReviewAndUserDto[] {
    return this._listReviewAndUser;
  }

  set listReviewAndUser(value: ReviewAndUserDto[]) {
    this._listReviewAndUser = value;
  }

  private loadPlace(id: number) {
    const sub = this.lieuService.getPlaceAndAddress(id).subscribe( lieu => this._placeAndAddress = lieu);
    this.subscriptions.push(sub);
  }

  createReview($event: Review) {
    $event.idPlace = this._id;
    this.subscriptions.push(this.reviewService.post($event.toAvisDto()).subscribe(
      // review => this.listReviewAndUser.push({
      //   review : review,
      //   user : null
      // })
    ));
  }

  private loadReviewOfPlace(id: number) {
    const sub = this.reviewService.getReviewsAndUserFromAPlace(id).subscribe(
      listReviewAndUser => this._listReviewAndUser = listReviewAndUser
    );
    this.subscriptions.push(sub);
  }
}
