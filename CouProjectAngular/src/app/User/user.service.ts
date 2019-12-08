import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAndAddressDto, UserDto} from './user-dto';
import {Favorites} from '../Favorites/favorites';
import {FavoritesDto} from '../Favorites/favorites-dto';
import {authenticateModelDto} from "./authenticateModel-dto";
import {PlaceAndAddressDto} from "../views/lieu/place-dto";

const URL_API_UTIL:string = "/api/user";
const URL_API_AUTH:string = "/api/user/authenticate";
const URL_API_FAV:string = "/api/favorites";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) {}


  //AUTHENTICATE
  postAuth(model: authenticateModelDto): Observable<UserDto>{
    return this.http.post<UserDto>(URL_API_AUTH, model);
  }
  /*getAuth(model : authenticateModelDto): Observable<authenticateModelDto>{
    return this.http.get<authenticateModelDto>(URL_API_AUTH);
  }*/


  //UTILISATEUR
  query():Observable<UserDto[]>{
    return this.http.get<UserDto[]>(URL_API_UTIL);
  }

  get(id:number): Observable<UserDto>{
    return this.http.get<UserDto>(URL_API_UTIL+'/'+id);
  }

  getUserWithAddress(id:number):Observable<UserAndAddressDto>{
    return this.http.get<UserAndAddressDto>(URL_API_UTIL+'/address/'+id);
  }

  getUsersWithAddress():Observable<UserAndAddressDto[]>{
    return this.http.get<UserAndAddressDto[]>(URL_API_UTIL+'/address/all');
  }

  post(user : UserAndAddressDto): Observable<UserAndAddressDto>{
    return this.http.post<UserAndAddressDto>(URL_API_UTIL, user);
  }

  delete(id: number): Observable<UserDto> {
    return this.http.delete<UserDto>(URL_API_UTIL+'/'+id);
  }

  put(utilisateur: UserDto): Observable<any>{
    return this.http.put(URL_API_UTIL, utilisateur);
  }

  //FAVORIS
  queryFavoris():Observable<FavoritesDto[]>{
    return this.http.get<FavoritesDto[]>(URL_API_FAV);
  }
  postFavoris(favoris : FavoritesDto): Observable<FavoritesDto>{
    return this.http.post<FavoritesDto>(URL_API_FAV, favoris);
  }
  deleteFavoris(id: number): Observable<FavoritesDto> {
    return this.http.delete<FavoritesDto>(URL_API_FAV+'/'+id);
  }

}
