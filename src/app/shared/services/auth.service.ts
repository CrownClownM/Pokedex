import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
import jwt_decode, {JwtPayload} from "jwt-decode";

import { environment } from 'src/environments/environment.prod';
import { LoginResponse, RegisterResponse } from '../interfaces/auth.interface';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrlAuth;
  existToken$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(email:string, password:string){
    const url = `${ this.baseUrl }/auth/login`;
    return this.http.post<LoginResponse>(url, {email, password})
    .pipe(
      tap( resp => {
        if ( resp.access_token ) {
          this.saveToken(resp.access_token);
          this.saveRefreshToken(resp.access_token);
        }
      }),
      switchMap(() => this.getProfile()
      )
    );
  }
  
  register( name: string, email: string, password: string ) {

    const url  = `${ this.baseUrl }/users`;
    const avatar ="https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon-thumbnail.png";
    const body = { name, email, password, avatar };

    return this.http.post<RegisterResponse>( url, body )
  }

  registerAndLogin( name: string, email: string, password: string ) {
    return this.register(name, email, password)
    .pipe(
      switchMap(() => this.login(email, password))
    );
  }

  saveToken(token:string){
    setCookie('token', token, {expires:365, path: '/'});
  }

  getToken(){
    const token = getCookie('token');
    return token;
  }

  logout(){
    removeCookie('token');
    removeCookie('refresh-token');
    this.existToken$.next(false);
  }

  saveRefreshToken(token:string){
    setCookie('refresh-token', token, {expires:365, path: '/'});
  }

  getRefreshToken(){
    const token = getCookie('refresh-token');
    return token;
  }

  refreshToken(refreshToken:string){
    const url = `${ this.baseUrl }/auth/refresh-token`;
    return this.http.post<LoginResponse>(url, {refreshToken})
    .pipe(
      tap( resp => {
        if ( resp.access_token ) {
          this.saveToken(resp.access_token);
          this.saveRefreshToken(resp.access_token);
        }
      }),
    );
  }

  getProfile() :Observable<RegisterResponse> {
    const url = `${ this.baseUrl }/auth/profile`;
    return this.http.get<RegisterResponse>( url, { context: checkToken() } )
  }

  validateToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      this.existToken$.next(true);
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  validateRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      this.existToken$.next(true);
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
