import {AvisDto} from './Avis-dto';
import {AdresseDto} from '../Adresse/Adresse-dto';

export declare type AvisList = Avis[];

export class Avis{
  private _id: number;
  private _note: number;
  private _commentaire: string;
  private _valider: number;
  private _idutil: number;
  private _idlieu: number;

  constructor(id: number, note: number, commentaire: string, valider: number, idutil: number, idlieu: number) {
    this._id = id;
    this._note = note;
    this._commentaire = commentaire;
    this._valider = valider;
    this._idutil = idutil;
    this._idlieu = idlieu;
  }
  get idlieu(): number {
    return this._idlieu;
  }
  set idlieu(value: number) {
    this._idlieu = value;
  }
  get idutil(): number {
    return this._idutil;
  }
  set idutil(value: number) {
    this._idutil = value;
  }
  get valider(): number {
    return this._valider;
  }
  set valider(value: number) {
    this._valider = value;
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get note(): number {
    return this._note;
  }
  set note(value: number) {
    this._note = value;
  }
  get commentaire(): string {
    return this._commentaire;
  }
  set commentaire(value: string) {
    this._commentaire = value;
  }
  //Object provenant de la db donc type Object !! -> Function to set Type (Avis)
  fromAvisDto(dto : AvisDto): Avis{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toAvisDto() : AvisDto {
    return {
      id : this._id,
      note: this._note,
      commentaire: this._commentaire,
      valider: this._valider,
      idutil: this._idutil,
      idlieu: this._idlieu
    }
  }
  equals(obj: Object) : boolean {
    if( obj instanceof Avis){
      return this.id == (<Avis>obj).id;
    }
    return false;
  }
}
