import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { IResponse } from '../_interfaces/IResponse';

const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
const email = "email";
const id = "id";

interface TokenPayload {
  [ROLE_CLAIM]: string;
  [email]: string;
  [id]: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'https://localhost:7047/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/login', { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.data.token);
          this.getRoleFromToken()
        })
      );
  }

  GetProfileImg()  {
    return this.http.get< IResponse >(this.apiUrl+'/GetProfileImg', {
      headers: {
        Authorization: "Bearer "+ localStorage.getItem("token")
      }
    }) ;
  }

  logout() {
    localStorage.removeItem('token');
  }

  GetEmailFromToken(){
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded[email] ;
    } catch (error) {
      console.error('Invalid Token', error);
      return null;
    }
  }
  
  GetId(){
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded[id] ;
    } catch (error) {
      console.error('Invalid Token', error);
      return null;
    }
  }

  getRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const role = decoded[ROLE_CLAIM];
      return role ? role.toLowerCase() : null;
    } catch (error) {
      console.error('Invalid Token', error);
      return null;
    }
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
