import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {style} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cou_Project';
  currentJustify = 'justified';
  isCollapsed: boolean = true;
  style;

  constructor() { }

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem("id_token");
    this.style = {
      'background-color': ''
    }
  }

  isLogIn(): any {
    if (localStorage.length >= 1) {
      this.style = {
        'background-color': 'green'
      }
    }
    return this.style;
  }
}
