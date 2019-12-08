import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthenticateService} from './User/authenticate.service';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  constructor(private authenticationService:AuthenticateService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authenticationService.getCurrentUserValue();
    if(currentUser && currentUser.token){
      req = req.clone({
        setHeaders:{
          Authorization : `Bearer ${currentUser.token}`
        }
      })
    }
    return next.handle(req);
  }

}
