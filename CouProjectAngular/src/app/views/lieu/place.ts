import {PlaceDto} from './place-dto';

export declare type Places = Place[];

export class Place {

  private _id: number;
  private _name: string;
  private _type: string;
  private _description: string;
  private _idAdr: number;

  constructor(id: number = -1, nom: string ='', type: string='', description: string='', idadr: number=-1) {
    this._id = id;
    this._name = nom;
    this._type = type;
    this._description = description;
    this._idAdr = idadr;
  }


  get idAdr(): number {
    return this._idAdr;
  }
  set idAdr(value: number) {
    this._idAdr = value;
  }
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  //Object provenant de la db donc type Object !! -> Function to set Type (Place)
  fromLieuDto(dto : PlaceDto): Place{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toLieuDto() : PlaceDto {
    return {
      id : this._id,
      name: this._name,
      type: this._type,
      description: this._description,
      idAdr: this._idAdr
    }
  }
  equals(obj: Object) : boolean {
    if( obj instanceof Place){
      return this.id == (<Place>obj).id;
    }
    return false;
  }
}
