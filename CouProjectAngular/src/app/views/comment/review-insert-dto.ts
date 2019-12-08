import {PlaceAndAddressDto} from '../lieu/place-dto';
import {UserDto} from '../../User/user-dto';

export interface ReviewInsertDto {
  id: number;
  star: number;
  comment: string;
  isValid: number;
  idUser: number;
  idPlace: number;
  date:string;
}

export interface ReviewAndUserDto {
  review : ReviewInsertDto;
  user : UserDto;
}

export interface ReviewWithPlaceAndAddressDto{
  review : ReviewInsertDto;
  placeAndAddress : PlaceAndAddressDto;
}
