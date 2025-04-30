import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const role = this.authService.getRoleFromToken();

    if (isLoggedIn && role === 'admin') {
      return true;
    }

    if (isLoggedIn && role !== 'admin') {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

