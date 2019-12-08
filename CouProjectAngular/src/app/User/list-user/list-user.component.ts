import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserAndAddressDto} from '../user-dto';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit,OnDestroy {
  private _userAndAddresses:UserAndAddressDto[] = [];
  private subscriptions: Subscription[] = [];

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.loadUserAndAddresses();
  }
  ngOnDestroy(): void {
  }

  get userAndAddresses(): UserAndAddressDto[] {
    return this._userAndAddresses;
  }

  set userAndAddresses(value: UserAndAddressDto[]) {
    this._userAndAddresses = value;
  }

  private loadUserAndAddresses() {
    this.subscriptions.push(
      this.userService.getUsersWithAddress().subscribe(users => this._userAndAddresses = users)
    );
  }
}
