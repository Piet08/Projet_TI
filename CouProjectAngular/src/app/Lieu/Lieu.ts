import {LieuDto} from './Lieu-dto';

export declare type LieuList = Lieu[];

export class Lieu {

  private _id: number;
  private _nom: string;
  private _type: string;
  private _description: string;
  private _idadr: number;

  constructor(id: number, nom: string, type: string, description: string, idadr: number) {
    this._id = id;
    this._nom = nom;
    this._type = type;
    this._description = description;
    this._idadr = idadr;
  }
  get idadr(): number {
    return this._idadr;
  }
  set idadr(value: number) {
    this._idadr = value;
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
  get nom(): string {
    return this._nom;
  }
  set nom(value: string) {
    this._nom = value;
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  //Object provenant de la db donc type Object !! -> Function to set Type (Lieu)
  fromLieuDto(dto : LieuDto): Lieu{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toLieuDto() : LieuDto {
    return {
      id : this._id,
      nom: this._nom,
      type: this._type,
      description: this._description,
      idadr: this._idadr
    }
  }
  equals(obj: Object) : boolean {
    if( obj instanceof Lieu){
      return this.id == (<Lieu>obj).id;
    }
    return false;
  }
}
