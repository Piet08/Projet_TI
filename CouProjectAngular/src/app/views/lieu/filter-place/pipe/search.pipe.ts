import { Pipe, PipeTransform } from '@angular/core';
import {PlaceAndAddressDto} from '../../place-dto';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(places:PlaceAndAddressDto[],filter:string): PlaceAndAddressDto[] {
    let filterToLower = filter.toLowerCase();
    return filter == "" ? places : places.filter(place => place.place.name.toLowerCase().includes(filterToLower));
  }

}
