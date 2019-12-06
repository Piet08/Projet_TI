import {AddressDto} from '../../Address/address-dto';

export interface PlaceDto {
  id: number;
  name: string;
  type: string;
  description: string;
  idAdr: number;
}

export interface PlaceAndAddressDto {
  place : PlaceDto;
  address : AddressDto;
  avgRate : number;
}
