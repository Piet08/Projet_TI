import { Pipe, PipeTransform } from '@angular/core';
import {EnumTypeLieu} from '../../../EnumTypeLieu';
import {Location} from '../../location-model';

@Pipe({
  name: 'typeMap'
})
export class TypeMapPipe implements PipeTransform {

  transform(markers:marker[], filter:EnumTypeLieu): marker[] {
    return filter === "ALL" ? markers : markers.filter(place => place.type == filter);
  }

}
