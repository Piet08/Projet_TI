import {AddressDto} from './address-dto';

export declare type AddressList = Address[];

export class Address {
  private _id: number;
  private _city: string;
  private _straat: string;
  private _num: number;
  private _postalCode: number;

  constructor(id: number = -1, ville: string = '', rue: string = '', num: number = -1, cp: number = -1) {
    this._id = id;
    this._city = ville;
    this._straat = rue;
    this._num = num;
    this._postalCode = cp;
  }
  get postalCode(): number {
    return this._postalCode;
  }
  set postalCode(value: number) {
    this._postalCode = value;
  }
  get num(): number {
    return this._num;
  }
  set num(value: number) {
    this._num = value;
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get straat(): string {
    return this._straat;
  }
  set straat(value: string) {
    this._straat = value;
  }
  get city(): string {
    return this._city;
  }
  set city(value: string) {
    this._city = value;
  }
  //Object provenant de la db donc type Object !! -> Function to set Type (Address)
  fromAdresseDto(dto : AddressDto): Address{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toAdresseDto() : AddressDto {
    return {
      id : this._id,
      city: this._city,
      straat: this._straat,
      num: this._num,
      postalCode: this._postalCode
    }
  }
  equals(obj: Object) : boolean {
    if( obj instanceof Address){
      return this.id == (<Address>obj).id;
    }
    return false;
  }

}
