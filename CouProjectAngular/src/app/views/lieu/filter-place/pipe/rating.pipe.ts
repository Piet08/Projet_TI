import { Pipe, PipeTransform } from '@angular/core';
import {PlaceAndAddressDto} from '../../place-dto';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {

  transform(places:PlaceAndAddressDto[],filter:number): PlaceAndAddressDto[] {
    if(!filter) return places;
    //Tri par ID
    if(filter == 0) {
      return places.sort( (a,b) =>{
        if(a.place.id > b.place.id) return 1;
        if(a.place.id <= b.place.id) return -1;
        return 0;
      })
    }
    //Tri par note moyenne
    if(filter == 1 || filter == 2){
      return places.sort( (a,b) =>{
        if(a.avgRate > b.avgRate) return filter == 1 ? -1 : 1;
        if(a.avgRate <= b.avgRate) return filter == 1 ? 1 : -1;
        return 0;
      });
    }
    //Tri par ordre alphabétique
    if(filter == 3 || filter == 4){
      return places.sort( (a,b) =>{
        if(a.place.name > b.place.name) return filter == 3 ? -1 : 1;
        if(a.place.name <= b.place.name) return filter == 3 ? 1 : -1;
      })
    }

    return places;
  }

}
