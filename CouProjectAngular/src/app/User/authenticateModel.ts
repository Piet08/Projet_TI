import {authenticateModelDto} from "./authenticateModel-dto";

export declare type authenticateModelList = authenticateModel[];

export class authenticateModel {

  private _username : string;
  private _password : string;
  private _token: string;
  private _type : number;

  constructor(username : string='', password: string='', token: string='', type:number=0) {
    this._username = username;
    this._password = password;
    this._token = token;
    this._type = type;
  }
  get type(): number {
    return this._type;
  }

  set type(value: number) {
    this._type = value;
  }
  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
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
    Object.assign(this._password, dto);
    Object.assign(this._username, dto);
    this._type = dto.type;
    this._token = dto.token;
    return this;
  }


  //Inverse de la méthode du dessus !
  toAuthenticateModelDto() : authenticateModelDto {
    return {
      username : this._username,
      password : this._password,
      token : this._token,
      type : this._type
    }
  }



}

