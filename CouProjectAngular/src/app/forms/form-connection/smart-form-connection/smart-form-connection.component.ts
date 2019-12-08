import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {authenticateModel, authenticateModelList} from "../../../User/authenticateModel";
import {UserService} from "../../../User/user.service";
import {User} from "../../../User/user";
import {authenticateModelDto} from "../../../User/authenticateModel-dto";
import {UserDto} from '../../../User/user-dto';
import {AuthenticateService} from '../../../User/authenticate.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-smart-form-connection',
  templateUrl: './smart-form-connection.component.html',
  styleUrls: ['./smart-form-connection.component.css']
})
export class SmartFormConnectionComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _currentUser:UserDto;

  constructor(public userService : UserService, public authService:AuthenticateService) { }

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

  get currentUser(): UserDto {
    return this._currentUser;
  }

  set currentUser(value: UserDto) {
    this._currentUser = value;
  }
  onSubmit($event:authenticateModel){
    this.authService.login($event.username,$event.password,$event.remember)
      .pipe(first())
      .subscribe();
  }

  createUserConnected($event: authenticateModel) {
    console.log(JSON.stringify($event));
    const sub = this.userService.postAuth($event.toAuthenticateModelDto()).subscribe(
      authenticateModelDTO =>{
        this._currentUser = new User().fromUtilisateurDto(authenticateModelDTO);
        localStorage.setItem("id_token",authenticateModelDTO.token);
        localStorage.setItem("name",this._currentUser.name);
        console.log(JSON.stringify(this._currentUser));
        this.isAdmin(this._currentUser);
      });
    this.subscriptions.push(sub);
  }

  isAdmin(user : UserDto){
    if(user.type === "1"){
      alert("Bienvenue administrateur");
    }
  }



}
