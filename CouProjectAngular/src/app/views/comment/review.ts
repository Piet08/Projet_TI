import {ReviewDto} from './review-dto';

export declare type ReviewList = Review[];

export class Review{
  private _id: number;
  private _star: number;
  private _comment: string;
  private _isValid: number;
  private _idUser: number;
  private _idPlace: number;
  private _date:string;

  constructor(id: number = -1, note: number = -1, commentaire: string = '', valider: number = -1, idutil: number = -1, idlieu: number = -1,date:string = '') {
    this._id = id;
    this._star = note;
    this._comment = commentaire;
    this._isValid = valider;
    this._idUser = idutil;
    this._idPlace = idlieu;
    this._date = date;
  }
  get date(): string {
    return this._date;
  }
  set date(value: string) {
    this._date = value;
  }
  get idPlace(): number {
    return this._idPlace;
  }
  set idPlace(value: number) {
    this._idPlace = value;
  }
  get idUser(): number {
    return this._idUser;
  }
  set idUser(value: number) {
    this._idUser = value;
  }
  get isValid(): number {
    return this._isValid;
  }
  set isValid(value: number) {
    this._isValid = value;
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get star(): number {
    return this._star;
  }
  set star(value: number) {
    this._star = value;
  }
  get comment(): string {
    return this._comment;
  }
  set comment(value: string) {
    this._comment = value;
  }
  //Object provenant de la db donc type Object !! -> Function to set Type (Review)
  fromAvisDto(dto : ReviewDto): Review{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toAvisDto() : ReviewDto {
    return {
      id : this._id,
      star: this._star,
      comment: this._comment,
      isValid: this._isValid,
      idUser: this._idUser,
      idPlace: this._idPlace,
      date : this._date
    }
  }
  equals(obj: Object) : boolean {
    if( obj instanceof Review){
      return this.id == (<Review>obj).id;
    }
    return false;
  }
}
