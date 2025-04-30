import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';

const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

interface TokenPayload {
  [ROLE_CLAIM]: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'https://localhost:7047/api/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password })
      .pipe(
        tap(response => {
          console.log('Login Response:', response);
          localStorage.setItem('token', response.data.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
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
