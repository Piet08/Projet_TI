import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlaceDto, PlaceAndAddressDto} from './place-dto';

const URL_API:string = "/api/place";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(public http:HttpClient) {}

  query():Observable<PlaceDto[]>{
    return this.http.get<PlaceDto[]>(URL_API);
  }

  get(id:number): Observable<PlaceDto>{
    return this.http.get<PlaceDto>(URL_API+'/'+id);
  }
  getPlaceAndAddress(id:number): Observable<PlaceAndAddressDto>{
    return this.http.get<PlaceAndAddressDto>(URL_API+'/address/'+id);
  }
  getPlacesAndAddressees():Observable<PlaceAndAddressDto[]>{
    return this.http.get<PlaceAndAddressDto[]>(URL_API+"/addresses");
  }
  // post(lieu : LieuDto): Observable<LieuDto>{
  //   return this.http.post<LieuDto>(URL_API, lieu);
  // }

  post(place : PlaceAndAddressDto): Observable<PlaceAndAddressDto>{
    return this.http.post<PlaceAndAddressDto>(URL_API+"/forms", place);
  }

  delete(id: number): Observable<PlaceDto> {
    return this.http.delete<PlaceDto>(URL_API+'/'+id);
  }

  put(lieu: PlaceDto): Observable<any>{
    return this.http.put(URL_API, lieu);
  }
}
