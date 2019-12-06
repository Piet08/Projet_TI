import { Pipe, PipeTransform } from '@angular/core';
import {PlaceAndAddressDto} from '../../place-dto';
import {EnumTypeLieu} from '../../../../EnumTypeLieu';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(places:PlaceAndAddressDto[], filter:EnumTypeLieu): PlaceAndAddressDto[] {
    return filter === "ALL" ? places : places.filter(place => place.place.type == filter);
  }

}
