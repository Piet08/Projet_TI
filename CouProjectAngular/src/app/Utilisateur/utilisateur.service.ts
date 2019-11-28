import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UtilisateurDto} from './Utilisateur-dto';
import {Favoris} from '../Favoris/Favoris';
import {FavorisDto} from '../Favoris/Favoris-dto';

const URL_API_UTIL:string = "/api/Utilisateur";
const URL_API_AUTH:string = "/api/authenticate";
const URL_API_FAV:string = "/api/Favoris";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(public http:HttpClient) {}

  //AUTHENTICATE
/*  queryAuth():Observable<UtilisateurDto[]>{
    return this.http.get<UtilisateurDto[]>(URL_API_AUTH);
  }
  postAuth(utilisateur : UtilisateurDto): Observable<UtilisateurDto>{
    return this.http.post<UtilisateurDto>(URL_API_AUTH, utilisateur);
  }*/


  //UTILISATEUR
  query():Observable<UtilisateurDto[]>{
    return this.http.get<UtilisateurDto[]>(URL_API_UTIL);
  }

  get(id:number): Observable<UtilisateurDto>{
    return this.http.get<UtilisateurDto>(URL_API_UTIL+'/'+id);
  }

  post(utilisateur : UtilisateurDto): Observable<UtilisateurDto>{
    return this.http.post<UtilisateurDto>(URL_API_UTIL, utilisateur);
  }

  delete(id: number): Observable<UtilisateurDto> {
    return this.http.delete<UtilisateurDto>(URL_API_UTIL+'/'+id);
  }

  put(utilisateur: UtilisateurDto): Observable<any>{
    return this.http.put(URL_API_UTIL, utilisateur);
  }

  //FAVORIS
  queryFavoris():Observable<FavorisDto[]>{
    return this.http.get<FavorisDto[]>(URL_API_FAV);
  }
  postFavoris(favoris : FavorisDto): Observable<FavorisDto>{
    return this.http.post<FavorisDto>(URL_API_FAV, favoris);
  }
  deleteFavoris(id: number): Observable<FavorisDto> {
    return this.http.delete<FavorisDto>(URL_API_FAV+'/'+id);
  }


}
