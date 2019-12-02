import {AdresseDto} from './Adresse-dto';

export declare type AdresseList = Adresse[];

export class Adresse {
  private _id: number;
  private _ville: string;
  private _rue: string;
  private _num: number;
  private _cp: number;

  constructor(id: number = -1, ville: string = '', rue: string = '', num: number = -1, cp: number = -1) {
    this._id = id;
    this._ville = ville;
    this._rue = rue;
    this._num = num;
    this._cp = cp;
  }
  get cp(): number {
    return this._cp;
  }
  set cp(value: number) {
    this._cp = value;
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
  get rue(): string {
    return this._rue;
  }
  set rue(value: string) {
    this._rue = value;
  }
  get ville(): string {
    return this._ville;
  }
  set ville(value: string) {
    this._ville = value;
  }
  //Object provenant de la db donc type Object !! -> Function to set Type (Adresse)
  fromAdresseDto(dto : AdresseDto): Adresse{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toAdresseDto() : AdresseDto {
    return {
      id : this._id,
      ville: this._ville,
      rue: this._rue,
      num: this._num,
      cp: this._cp
    }
  }
  equals(obj: Object) : boolean {
    if( obj instanceof Adresse){
      return this.id == (<Adresse>obj).id;
    }
    return false;
  }

}
