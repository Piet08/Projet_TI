import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticateService} from './User/authenticate.service';
import {Observable} from 'rxjs';

@Injectable({providedIn:'root'})
export class AuthGard implements CanActivate{
  constructor(private router:Router,private authService:AuthenticateService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getCurrentUserValue();
    if(currentUser){
      return true
    }

    this.router.navigate(['/login'])
    return false;
  }
}
