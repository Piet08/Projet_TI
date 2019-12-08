import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationUserServiceService {

  private _currLat: number;
  private _currLng: number;

  constructor() { }

  getCurrentPosition(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
      // Invokes getCurrentPosition method of Geolocation API.
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          observer.next(position);
          observer.complete();
        },
        (error: PositionError) => {
          console.log('Geolocation service: ' + error.message);
          observer.error(error);
        }
      );
    });
  }


  get currLat(): number {
    return this._currLat;
  }

  set currLat(value: number) {
    this._currLat = value;
  }

  get currLng(): number {
    return this._currLng;
  }

  set currLng(value: number) {
    this._currLng = value;
  }
}
