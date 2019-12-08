import { Pipe, PipeTransform } from '@angular/core';
import {Location} from '../../location-model';

@Pipe({
  name: 'ratingMap'
})
export class RatingMapPipe implements PipeTransform {

  transform(markers:marker[],filter:number): marker[] {
    if(!filter) return markers;
    //Tri par ID
    if(filter == 0) {
      return markers.sort( (a,b) =>{
        if(a.idPlace > b.idPlace) return 1;
        if(a.idPlace <= b.idPlace) return -1;
        return 0;
      })
    }
    //Tri par note moyenne
    if(filter == 1 || filter == 2){
      return markers.sort( (a,b) =>{
        if(a.rating > b.rating) return filter == 1 ? -1 : 1;
        if(a.rating <= b.rating) return filter == 1 ? 1 : -1;
        return 0;
      });
    }
    //Tri par ordre alphabétique
    if(filter == 3 || filter == 4){
      return markers.sort( (a,b) =>{
        if(a.straat > b.straat) return filter == 3 ? -1 : 1;
        if(a.straat <= b.straat) return filter == 3 ? 1 : -1;
      })
    }

    return markers;
  }

}
