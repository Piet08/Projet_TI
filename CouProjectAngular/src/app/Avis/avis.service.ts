import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AvisDto} from './Avis-dto';

const URL_API:string = "/api/Avis";

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  constructor(public http:HttpClient) {}

  query():Observable<AvisDto[]>{
    return this.http.get<AvisDto[]>(URL_API);
  }

  get(id:number): Observable<AvisDto>{
    return this.http.get<AvisDto>(URL_API+'/'+id);
  }

  post(avis : AvisDto): Observable<AvisDto>{
    return this.http.post<AvisDto>(URL_API, avis);
  }

  delete(id: number): Observable<AvisDto> {
    return this.http.delete<AvisDto>(URL_API+'/'+id);
  }

  put(avis: AvisDto): Observable<any>{
    return this.http.put(URL_API, avis);
  }
}
