import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cou_Project';
  currentJustify = 'justified';
  isCollapsed: boolean = true;

  constructor() { }

  ngOnInit() {
  }
}
