import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LieuDto} from './Lieu-dto';
import {Lieu} from './Lieu';

const URL_API:string = "/api/Lieu";

@Injectable({
  providedIn: 'root'
})
export class LieuService {

  constructor(public http:HttpClient) {}

  query():Observable<LieuDto[]>{
    return this.http.get<LieuDto[]>(URL_API);
  }

  get(id:number): Observable<LieuDto>{
    return this.http.get<LieuDto>(URL_API+'/'+id);
  }

  post(lieu : LieuDto): Observable<LieuDto>{
    return this.http.post<LieuDto>(URL_API, lieu);
  }

  delete(id: number): Observable<LieuDto> {
    return this.http.delete<LieuDto>(URL_API+'/'+id);
  }

  put(lieu: LieuDto): Observable<any>{
    return this.http.put(URL_API, lieu);
  }
}
