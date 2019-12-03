import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDto} from './user-dto';
import {Favorites} from '../Favorites/favorites';
import {FavoritesDto} from '../Favorites/favorites-dto';

const URL_API_UTIL:string = "/api/User";
const URL_API_AUTH:string = "/api/authenticate";
const URL_API_FAV:string = "/api/Favorites";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) {}

  //AUTHENTICATE
/*  queryAuth():Observable<UserDto[]>{
    return this.http.get<UserDto[]>(URL_API_AUTH);
  }
  postAuth(utilisateur : UserDto): Observable<UserDto>{
    return this.http.post<UserDto>(URL_API_AUTH, utilisateur);
  }*/


  //UTILISATEUR
  query():Observable<UserDto[]>{
    return this.http.get<UserDto[]>(URL_API_UTIL);
  }

  get(id:number): Observable<UserDto>{
    return this.http.get<UserDto>(URL_API_UTIL+'/'+id);
  }

  post(utilisateur : UserDto): Observable<UserDto>{
    return this.http.post<UserDto>(URL_API_UTIL, utilisateur);
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
