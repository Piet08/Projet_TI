import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewDto} from './review-dto';

const URL_API:string = "/api/Review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(public http:HttpClient) {}

  query():Observable<ReviewDto[]>{
    return this.http.get<ReviewDto[]>(URL_API);
  }

  // get(id:number): Observable<ReviewDto>{
  //   return this.http.get<ReviewDto>(URL_API+'/'+id);
  // }

  getAvisFromAnUser(idLieu:number):Observable<ReviewDto[]>{
    return this.http.get<ReviewDto[]>(URL_API+'/'+idLieu);
  }

  post(avis : ReviewDto): Observable<ReviewDto>{
    return this.http.post<ReviewDto>(URL_API, avis);
  }

  delete(id: number): Observable<ReviewDto> {
    return this.http.delete<ReviewDto>(URL_API+'/'+id);
  }

  put(avis: ReviewDto): Observable<any>{
    return this.http.put(URL_API, avis);
  }
}
