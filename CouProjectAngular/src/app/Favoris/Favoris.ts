import {FavorisDto} from './Favoris-dto';

export declare type FavorisList = Favoris[];

export class Favoris {

  private _idutil: number;
  private _idlieu: number;

  constructor(idutil: number, idlieu: number) {
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
  //Object provenant de la db donc type Object !! -> Function to set Type (Favoris)
  fromFavorisDto(dto : FavorisDto): Favoris{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toFavorisDto() : FavorisDto {
    return {
      idutil : this._idutil,
      idlieu: this._idlieu
    }
  }
  //Check les 2 pour identifier
  equals(obj: Object) : boolean {
    if( obj instanceof Favoris){
      return this.idutil == (<Favoris>obj).idutil && this.idlieu == (<Favoris>obj).idlieu;
    }
    return false;
  }
}
