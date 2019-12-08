import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EnumTypeLieu} from '../../EnumTypeLieu';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EnumRange} from '../../EnumRange';

@Component({
  selector: 'app-filter-markers',
  templateUrl: './filter-markers.component.html',
  styleUrls: ['./filter-markers.component.css']
})
export class FilterMarkersComponent implements OnInit {

  TYPE_LIEUX:EnumTypeLieu[] = [EnumTypeLieu.ALL,EnumTypeLieu.RESTAURANT,EnumTypeLieu.BAR,EnumTypeLieu.MAGASIN,EnumTypeLieu.MUSEE,EnumTypeLieu.FAST_FOOD
    ,EnumTypeLieu.BRASSERIE,EnumTypeLieu.DIVERTISSEMENT];
  RANGE: EnumRange[] = [EnumRange.ALL,EnumRange.QUARTER,EnumRange.HALF,EnumRange.ONE,EnumRange.ONE_HALF,EnumRange.TWO
    ,EnumRange.THREE];

  @Output()
  category:EventEmitter<EnumTypeLieu> = new EventEmitter<EnumTypeLieu>();

  @Output()
  range:EventEmitter<EnumRange> = new EventEmitter<EnumRange>();



  formFilter:FormGroup = this.fb.group({
    category : this.fb.control(''),
    range : this.fb.control(''),
  });


  constructor(public fb:FormBuilder) { }

  ngOnInit() {
  }


  emitFilterCategory() {
    this.category.next(this.formFilter.get('category').value);
  }

  emitFilterRange() {
    this.range.next(this.formFilter.get('range').value);
  }
}
