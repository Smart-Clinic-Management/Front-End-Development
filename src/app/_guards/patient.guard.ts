import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const role = this.authService.getRoleFromToken();

    if (isLoggedIn &&  role === 'patient') {
      return true;
    }

    if (isLoggedIn && role !== 'patient') {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

