import {UtilisateurDto} from './Utilisateur-dto';
import {LieuDto} from '../Lieu/Lieu-dto';

export declare type UtilisateurList = Utilisateur[];

export class Utilisateur {
  private _id: number;
  private _nom: string;
  private _prenom: string;
  private _pseudo: string;
  private _type: string;
  private _email: string;
  private _hashpwd: string;
  private _idadr: number;
  private _token: string;

  constructor(id: number, nom: string, prenom: string, pseudo: string, type: string, email: string, hashpwd: string, idadr: number, token: string) {
    this._id = id;
    this._nom = nom;
    this._prenom = prenom;
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
  get nom(): string {
    return this._nom;
  }
  set nom(value: string) {
    this._nom = value;
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
  get prenom(): string {
    return this._prenom;
  }
  set prenom(value: string) {
    this._prenom = value;
  }
  //Object provenant de la db donc type Object !! -> Function to set Type (Utilisateur)
  fromUtilisateurDto(dto : UtilisateurDto): Utilisateur{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toUtilisateurDto() : UtilisateurDto {
    return {
      id : this._id,
      nom: this._nom,
      prenom: this._prenom,
      pseudo: this._pseudo,
      type: this._type,
      email: this._email,
      hashpwd: this._hashpwd,
      idadr: this._idadr,
      token: this._token
    }
  }
  equals(obj: Object) : boolean {
    if( obj instanceof Utilisateur){
      return this.id == (<UtilisateurDto>obj).id;
    }
    return false;
  }


}
