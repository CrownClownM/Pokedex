import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor( private token:AuthService , private router: Router) {}

  canActivate(): boolean{
    const isValidToken = this.token.validateToken();
    if (isValidToken) {
      this.router.navigate(['/']);
    }
    return true;
  }
  
}
