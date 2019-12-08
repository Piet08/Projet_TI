import {Component, Input, OnInit} from '@angular/core';
import {UserAndAddressDto} from '../user-dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  private _user:UserAndAddressDto;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  get user(): UserAndAddressDto {
    return this._user;
  }
  @Input()
  set user(value: UserAndAddressDto) {
    this._user = value;
  }

  navigateToReviewsOfUser() {
    this.router.navigate(['user/'+this.user.user.id]);
  }
}
