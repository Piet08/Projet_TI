import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewInsertDto} from './review-insert-dto';

const URL_API:string = "/api/Review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(public http:HttpClient) {}

  query():Observable<ReviewInsertDto[]>{
    return this.http.get<ReviewInsertDto[]>(URL_API);
  }

  // get(id:number): Observable<ReviewDto>{
  //   return this.http.get<ReviewDto>(URL_API+'/'+id);
  // }

  getAvisFromAnUser(idLieu:number):Observable<ReviewInsertDto[]>{
    return this.http.get<ReviewInsertDto[]>(URL_API+'/place/'+idLieu);
  }

  post(avis : ReviewInsertDto): Observable<ReviewInsertDto>{
    return this.http.post<ReviewInsertDto>(URL_API, avis);
  }

  delete(id: number): Observable<ReviewInsertDto> {
    return this.http.delete<ReviewInsertDto>(URL_API+'/'+id);
  }

  put(avis: ReviewInsertDto): Observable<any>{
    return this.http.put(URL_API, avis);
  }
}
