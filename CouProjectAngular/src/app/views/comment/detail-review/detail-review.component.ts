import {Component, Input, OnInit} from '@angular/core';
import {ReviewWithPlaceAndAddressDto} from '../review-insert-dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail-review',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit {
  private _review:ReviewWithPlaceAndAddressDto;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  get review(): ReviewWithPlaceAndAddressDto {
    return this._review;
  }
  @Input()
  set review(value: ReviewWithPlaceAndAddressDto) {
    this._review = value;
  }

  navigateToPlace() {
    this.router.navigate(['place/'+this.review.placeAndAddress.place.id]);
  }
}
