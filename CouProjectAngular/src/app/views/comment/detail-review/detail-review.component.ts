import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Review} from '../review';
import {User} from '../../../User/user';
import {UserService} from '../../../User/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detail-comment',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit,OnDestroy{
  private _review:Review;
  private _user:User = new User();
  private subscriptions: Subscription[] = [];
  constructor(public utilService:UserService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  get review(): Review {
    return this._review;
  }

  @Input()
  set review(value: Review) {
    this._review = value;
    this.getUser(this._review.idUser);
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  private getUser(idutil: number) {
    const sub = this.utilService.get(idutil).subscribe(user => this._user = new User().fromUtilisateurDto(user));
    this.subscriptions.push(sub);
  }
}
