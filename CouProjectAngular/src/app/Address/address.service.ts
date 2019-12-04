import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddressDto} from './address-dto';
import {Address} from './address';

const URL_API:string = "/api/Address";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(public http:HttpClient) {}

  query():Observable<AddressDto[]>{
    return this.http.get<AddressDto[]>(URL_API);
  }

  get(id:number): Observable<AddressDto>{
    return this.http.get<AddressDto>(URL_API+'/'+id);
  }

  post(adresse : AddressDto): Observable<AddressDto>{
    return this.http.post<AddressDto>(URL_API, adresse);
  }

  delete(id: number): Observable<AddressDto> {
    return this.http.delete<AddressDto>(URL_API+'/'+id);
  }

  put(adresse: AddressDto): Observable<any>{
    return this.http.put(URL_API, adresse);
  }
}
