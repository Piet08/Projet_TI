import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {authenticateModel, authenticateModelList} from "../../../User/authenticateModel";
import {UserService} from "../../../User/user.service";

@Component({
  selector: 'app-smart-form-connection',
  templateUrl: './smart-form-connection.component.html',
  styleUrls: ['./smart-form-connection.component.css']
})
export class SmartFormConnectionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _usersConnected: authenticateModelList = [];

  constructor(public userService : UserService, private http: HttpClient) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    for (let i = this.subscriptions.length - 1; i >= 0; i--) {
      const subscription = this.subscriptions[i];
      //IF subscription EXISTE
      subscription && subscription.unsubscribe();
      this.subscriptions.pop();
    }
  }

  createUserConnected($event: authenticateModel) {
    //console.log($event);
    const sub = this.userService.postAuth($event.toAuthenticateModelDto()).subscribe( authenticateModelDTO => this._usersConnected.push(new authenticateModel().fromAuthenticateModelDto(authenticateModelDTO)));
    this.subscriptions.push(sub);
  }
}
