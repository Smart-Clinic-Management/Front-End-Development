import { Component } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-header',
  imports: [],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.css'
})
export class TopHeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
