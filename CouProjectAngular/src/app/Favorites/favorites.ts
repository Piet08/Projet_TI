import {FavoritesDto} from './favorites-dto';

export declare type FavoritesList = Favorites[];

export class Favorites {

  private _idUser: number;
  private _idPlace: number;

  constructor(idutil: number, idlieu: number) {
    this._idUser = idutil;
    this._idPlace = idlieu;
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
  //Object provenant de la db donc type Object !! -> Function to set Type (Favorites)
  fromFavorisDto(dto : FavoritesDto): Favorites{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toFavorisDto() : FavoritesDto {
    return {
      idUser : this._idUser,
      idPlace: this._idPlace
    }
  }
  //Check les 2 pour identifier
  equals(obj: Object) : boolean {
    if( obj instanceof Favorites){
      return this.idUser == (<Favorites>obj).idUser && this.idPlace == (<Favorites>obj).idPlace;
    }
    return false;
  }
}
