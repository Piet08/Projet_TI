import {EnumTypeLieu} from './EnumTypeLieu';

export enum EnumRange{
  ALL = "ALL",
  QUARTER = "200 m",
  HALF = "500 m",
  ONE = "1 km",
  ONE_HALF = "1,5 km",
  TWO = "2 km",
  THREE = "3 km",
}

export const RANGE = [EnumRange.ALL, EnumRange.QUARTER,EnumRange.HALF,EnumRange.ONE,EnumRange.ONE_HALF,EnumRange.TWO
  ,EnumRange.THREE];
