import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdresseDto} from './Adresse-dto';
import {Adresse} from './Adresse';

const URL_API:string = "/api/Adresse";

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(public http:HttpClient) {}

  query():Observable<AdresseDto[]>{
    return this.http.get<AdresseDto[]>(URL_API);
  }

  get(id:number): Observable<AdresseDto>{
    return this.http.get<AdresseDto>(URL_API+'/'+id);
  }

  post(adresse : AdresseDto): Observable<AdresseDto>{
    return this.http.post<AdresseDto>(URL_API, adresse);
  }

  delete(id: number): Observable<AdresseDto> {
    return this.http.delete<AdresseDto>(URL_API+'/'+id);
  }

  put(adresse: AdresseDto): Observable<any>{
    return this.http.put(URL_API, adresse);
  }
}
