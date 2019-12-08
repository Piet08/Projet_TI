import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EnumTypeLieu} from '../../../EnumTypeLieu';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter-place',
  templateUrl: './filter-place.component.html',
  styleUrls: ['./filter-place.component.css']
})
export class FilterPlaceComponent implements OnInit {
  TYPE_LIEUX:EnumTypeLieu[] = [EnumTypeLieu.ALL,EnumTypeLieu.RESTAURANT,EnumTypeLieu.BAR,EnumTypeLieu.MAGASIN,EnumTypeLieu.MUSEE,EnumTypeLieu.FAST_FOOD
    ,EnumTypeLieu.BRASSERIE,EnumTypeLieu.DIVERTISSEMENT];

  TYPE_SORT:any = [
    {
      key : 0,
      name : "Tri par défaut"
    },
    {
      key : 1,
      name : "Tri par note décroissante"
    },
    {
      key : 2,
      name : "Tri par note croissante"
    },
    {
      key : 3,
      name : "Z à A"
    },
    {
      key : 4,
      name : "A à Z"
    },
  ];

  @Output()
  category:EventEmitter<EnumTypeLieu> = new EventEmitter<EnumTypeLieu>();

  @Output()
  sort:EventEmitter<number> = new EventEmitter<number>();

  @Output()
  search:EventEmitter<string> = new EventEmitter<string>();

  formFilter:FormGroup = this.fb.group({
    category : this.fb.control(''),
    sort : this.fb.control(''),
    search:this.fb.control(''),
  });


  constructor(public fb:FormBuilder) { }

  ngOnInit() {
  }


  emitFilterCategory() {
    this.category.next(this.formFilter.get('category').value);
  }

  emitTypeSort() {
    this.sort.next(this.formFilter.get('sort').value);
  }

  emitSearch() {
    this.search.next(this.formFilter.get('search').value);
  }
}
