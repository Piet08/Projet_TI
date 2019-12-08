import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const URL_API_AUTH:string = "/api/User/authenticate";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser:Observable<User>;

  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getCurrentUserValue(): User{
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, remember: boolean) {
    return this.http.post(URL_API_AUTH, {username, password}).pipe(
      map(user => {
        if(remember)
          localStorage.setItem('currentUser', JSON.stringify(user));

        console.log(<User> user);
        this.currentUserSubject.next(<User> user);
        return user;
      })
    );
  }

  logout(){
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
