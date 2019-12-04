import {AddressDto} from "../Address/address-dto";

export interface UserDto {
  id: number;
  name: string;
  surname: string;
  pseudo: string;
  type: string;
  email: string;
  hashpwd: string;
  idadr: number;
  token: string;
}

export interface UserAndAddressDto {
  user : UserDto;
  address : AddressDto;
}

