import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {PlaceDto, PlaceAndAddressDto} from './place-dto';

const URL_API:string = "/api/place";
const URL_API_MAP:string = "/api/place/map";

@Injectable({
  providedIn: 'root'
})
export class PlaceService implements OnDestroy{

  // private _placeAndAddressesSubject:BehaviorSubject<PlaceAndAddressDto[]> ;
  // public placeAndAddresses:Observable<PlaceAndAddressDto[]> = new Observable<PlaceAndAddressDto[]>();

  constructor(public http:HttpClient) {
    // this.getPlacesAndAddressees().subscribe(places => {
    //   this._placeAndAddressesSubject = new BehaviorSubject<PlaceAndAddressDto[]>(places);
    //   this.placeAndAddresses = this._placeAndAddressesSubject.asObservable();
    // });
  }

  ngOnDestroy(): void {
  }

  query():Observable<PlaceDto[]>{
    return this.http.get<PlaceDto[]>(URL_API);
  }

  queryMap():Observable<PlaceAndAddressDto[]>{
    return this.http.get<PlaceAndAddressDto[]>(URL_API_MAP);
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


  postPlaceAndAddress(place : PlaceAndAddressDto): Observable<PlaceAndAddressDto>{
    return this.http.post<PlaceAndAddressDto>(URL_API + "/forms",place);

  post(lieu : PlaceDto): Observable<PlaceDto>{
    return this.http.post<PlaceDto>(URL_API, lieu);
  }

  postPlaceAndAddress(place : PlaceAndAddressDto): Observable<PlaceAndAddressDto>{
    return this.http.post<PlaceAndAddressDto>(URL_API+"/forms", place);
  }

  deleteWithCascade(id:number):Observable<PlaceAndAddressDto>{
    return this.http.delete<PlaceAndAddressDto>(URL_API+"/address/reviews/"+id);
  }

  // delete(id: number): Observable<PlaceDto> {
  //   return this.http.delete<PlaceDto>(URL_API+'/'+id);
  // }

  put(lieu: PlaceDto): Observable<any>{
    return this.http.put(URL_API, lieu);
  }
}
