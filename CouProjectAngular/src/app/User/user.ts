import {UserDto} from './user-dto';
import {PlaceDto} from '../views/lieu/place-dto';

export declare type UserList = User[];

export class User {
  private _id: number;
  private _name: string;
  private _surname: string;
  private _pseudo: string;
  private _type: string;
  private _email: string;
  private _hashpwd: string;
  private _idadr: number;
  private _token: string;

  constructor(id: number = -1, nom: string = '', prenom: string='', pseudo: string='', type: string='', email: string='', hashpwd: string='', idadr: number=-1, token: string='') {
    this._id = id;
    this._name = nom;
    this._surname = prenom;
    this._pseudo = pseudo;
    this._type = type;
    this._email = email;
    this._hashpwd = hashpwd;
    this._idadr = idadr;
    // A voir si il faut l'instancier ici
    this._token = token;
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  } get token(): string {
    return this._token;
  }
  set token(value: string) {
    this._token = value;
  }
  get idadr(): number {
    return this._idadr;
  }
  set idadr(value: number) {
    this._idadr = value;
  }
  get hashpwd(): string {
    return this._hashpwd;
  }
  set hashpwd(value: string) {
    this._hashpwd = value;
  }
  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }
  get pseudo(): string {
    return this._pseudo;
  }
  set pseudo(value: string) {
    this._pseudo = value;
  }
  get surname(): string {
    return this._surname;
  }
  set surname(value: string) {
    this._surname = value;
  }
  //Object provenant de la db donc type Object !! -> Function to set Type (User)
  fromUtilisateurDto(dto : UserDto): User{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toUtilisateurDto() : UserDto {
    return {
      id : this._id,
      name: this._name,
      surname: this._surname,
      pseudo: this._pseudo,
      type: this._type,
      email: this._email,
      hashpwd: this._hashpwd,
      idadr: this._idadr,
      token: this._token
    }
  }
  equals(obj: Object) : boolean {
    if( obj instanceof User){
      return this.id == (<UserDto>obj).id;
    }
    return false;
  }


}
