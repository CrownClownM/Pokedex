import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate {

  constructor( private auth:AuthService, private router: Router ){}

  canActivate(): boolean { 
    const isValidToken = this.auth.validateRefreshToken();
    if (isValidToken) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }

  canLoad(): boolean {
    const isValidToken = this.auth.validateRefreshToken();
    if (isValidToken) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }

}
