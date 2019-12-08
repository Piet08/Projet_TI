import { Pipe, PipeTransform } from '@angular/core';
import {EnumRange} from '../../../EnumRange';
import {Location} from '../../location-model';

@Pipe({
  name: 'rangeMap'
})
export class RangeMapPipe implements PipeTransform {
  rayon: number = 6367445;
  pi: number = 3.14159265359;
  defaultLocal: Location = {lat:50.4535621,lng:3.9488198}; //DEFAULT LOCATION IN MONS

  transform(markers: marker[], filter: EnumRange, positionUser: Location): marker[] {
    if (!filter) return markers;
    //positionUser = this.defaultLocal;
    console.log(positionUser)

    for (let i = 0; i < markers.length; i++) {
      markers[i].distanceUser = this.rayon * Math.acos(Math.sin((markers[i].lat * this.pi) / 180) * Math.sin((positionUser.lat * this.pi) / 180) + Math.cos((markers[i].lat * this.pi) / 180) * Math.cos((positionUser.lat * this.pi) / 180) * Math.cos((markers[i].lng* this.pi/180) - (positionUser.lng* this.pi/180)));
    }

    if(filter == 'ALL') return markers;

    if (filter == "200 m") {
      return markers.filter((a) => a.distanceUser <= 200);
    }

    if (filter == "500 m") {
      return markers.filter((a) => a.distanceUser <= 500);
    }

    if (filter == "1 km") {
      return markers.filter((a) => a.distanceUser <= 1000);
    }

    if (filter == "1,5 km") {
      return markers.filter((a) => a.distanceUser <= 1500);
    }

    if (filter == "2 km") {
      return markers.filter((a) => a.distanceUser <= 2000);
    }

    if (filter == "3 km") {
      return markers.filter((a) => a.distanceUser <= 3000);
    }


  }
}
