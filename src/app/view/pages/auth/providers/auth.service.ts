import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject(null);
  isLogin: boolean | undefined;

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('token') && localStorage.getItem('token') != null) {
      this.saveCurrentUser();
    }
  }
  saveCurrentUser() {
    let token: any = localStorage.getItem('token');
    this.currentUser.next(jwtDecode(token));
  }
  register(formData: any): Observable<any> {
    return this._HttpClient.post(
      'https://route-egypt-api.herokuapp.com/signup',
      formData
    );
  }
  login(formData: any): Observable<any> {
    return this._HttpClient.post(
      'https://route-egypt-api.herokuapp.com/signin',
      formData
    );
  }
  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('token');
    this._Router.navigate(['/']);
  }
}
