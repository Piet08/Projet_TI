import { Component, OnInit } from '@angular/core';
import {UserAndAddressDto} from '../user-dto';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';
import {ReviewService} from '../../views/comment/review.service';
import {ReviewInsertDto, ReviewWithPlaceAndAddressDto} from '../../views/comment/review-insert-dto';
import {User} from '../user';
import {Address} from '../../Address/address';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  private _user:UserAndAddressDto = {user:new User().toUtilisateurDto(),address:new Address().toAdresseDto()};
  private _reviews:ReviewWithPlaceAndAddressDto[] = [];
  private _id:number;
  private subscriptions: Subscription[] = [];

  constructor(private _route:ActivatedRoute,private userService:UserService,private reviewService:ReviewService) { }

  ngOnInit() {
    this._id = parseInt(this._route.snapshot.params['id'],10);
    this.loadUser(this._id);
    this.loadReviewsFromUser(this._id);
  }

  get user(): UserAndAddressDto {
    return this._user;
  }

  set user(value: UserAndAddressDto) {
    this._user = value;
  }

  get reviews(): ReviewWithPlaceAndAddressDto[] {
    return this._reviews;
  }

  set reviews(value: ReviewWithPlaceAndAddressDto[]) {
    this._reviews = value;
  }

  private loadUser(id:number) {
    this.subscriptions.push(
      this.userService.getUserWithAddress(id).subscribe(user => this.user = user)
    );
  }

  private loadReviewsFromUser(id: number) {
    this.subscriptions.push(
      this.reviewService.getReviewsWithPlaceAndAddressFromAnUser(id).subscribe(reviews => {this._reviews = reviews;console.log(reviews)})
    );
  }
}
