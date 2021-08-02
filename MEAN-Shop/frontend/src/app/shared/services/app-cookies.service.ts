import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppCookiesService {

  constructor( private cookie: CookieService ) { }

  initCookies(): void { }

  setToken(token: string, refreshToken: boolean = false): void {
    this.cookie.set(
      refreshToken ? 'refresh' : 'token',
      token,
      { 
        expires: new Date( new Date().getTime() + (refreshToken ? 600000 : 200000) ), //Pendiente de ajustar el tiempo
        path: '/' 
      } 
    );
  }

  /**
   * Devuelve el valor de la cookie token (o refresh token en caso de pasar true como parámetro).
   * 
   * @param {boolean} refreshToken True si se desea obtener el valor del token de refresto. [opcional]
   * @returns {string} Valor del token o token de refresco. En caso de no existir la cookie devuelve un string vacío.
   */
  getToken(refreshToken: boolean = false): string{
    return this.cookie.get( refreshToken ? 'refresh' : 'token' );
  }

  deleteToken(refreshToken: boolean = false): void{
    this.cookie.delete( refreshToken ? 'refresh' : 'token', '/' );
  }

  setProfile(profileToken: string): void {
    this.cookie.set( 'profile', profileToken, { path: '/' } );
  }
  getProfile(): string {
    return this.cookie.get('profile');
  }
  deleteProfile(): void{
    this.cookie.delete( 'profile', '/' );
  }

  login(token: string, refreshToken: string/* , profile: string */): void {
    this.setToken(token);
    this.setToken(refreshToken, true);
    //this.setProfile(profile);
  }

  logout(): void {
    this.deleteToken();
    this.deleteToken(true);
    this.deleteProfile();
  }

  checkLogin(): boolean {
    return this.cookie.check('token') || this.cookie.check('refresh');
  }
}
