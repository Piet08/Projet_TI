import {authenticateModelDto} from "./authenticateModel-dto";

export declare type authenticateModelList = authenticateModel[];

export class authenticateModel {

  private _username : string;
  private _password : string;

  constructor(username : string='', password: string='') {
    this._username = username;
    this._password = password;
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
  //Object provenant de la db donc type Object !! -> Function to set Type (Utilisateur)
  fromAuthenticateModelDto(dto : authenticateModelDto): authenticateModel{
    Object.assign(this, dto);
    return this;
  }
  //Inverse de la méthode du dessus !
  toAuthenticateModelDto() : authenticateModelDto {
    return {
      username : this._username,
      password : this._password
    }
  }


}

