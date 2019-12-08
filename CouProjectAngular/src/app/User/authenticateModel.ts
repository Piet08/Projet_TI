import {authenticateModelDto} from "./authenticateModel-dto";

export declare type authenticateModelList = authenticateModel[];

export class authenticateModel {

  private _username : string;
  private _password : string;
  private _remember :boolean;

  constructor(username : string='', password: string='',remember:boolean = false) {
    this._username = username;
    this._password = password;
    this._remember = remember;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get remember(): boolean {
    return this._remember;
  }

  set remember(value: boolean) {
    this._remember = value;
  }

//Object provenant de la db donc type Object !! -> Function to set Type (Utilisateur)
  fromAuthenticateModelDto(dto : authenticateModelDto): authenticateModel{
    Object.assign(this._password, dto);
    Object.assign(this._username, dto);
    return this;
  }


  //Inverse de la méthode du dessus !
  toAuthenticateModelDto() : authenticateModelDto {
    return {
      username : this._username,
      password : this._password,
      remember : this._remember,
    }
  }



}

