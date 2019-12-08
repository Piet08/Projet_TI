import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {style} from "@angular/animations";
import {UserAndAddressDto} from './User/user-dto';
import {UserService} from './User/user.service';
import {AuthenticateService} from './User/authenticate.service';
import {Router} from '@angular/router';
import {User} from './User/user';
import {PlaceService} from './views/lieu/place.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cou_Project';
  currentUser : User;
  isCollapsed: boolean = true;
  style;

  constructor(public authService:AuthenticateService,public placeService:PlaceService, private router:Router) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(centralUserFromService=>{
      this.currentUser = centralUserFromService;
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
    this.style = {
      'background-color': ''
    }
  }

  isLogIn(): any {
    if (this.currentUser) {
      this.style = {
        'background-color': 'green'
      }
      //console.log(localStorage.getItem("id_token"));
      //console.log(localStorage.getItem("id_token"));
      // this.userService.http.get()
    }
    return this.style;
  }
}
