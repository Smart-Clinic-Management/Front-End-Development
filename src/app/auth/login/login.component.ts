import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: [
    '../../../assets/website/css/bootstrap.min.css',
    './login.component.css',
  ],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const role = this.authService.getRoleFromToken();
        console.log(role);
        switch (role) {
          case 'patient':
            this.router.navigate(['/']);
            break;
          case 'admin':
            this.router.navigate(['/dashboard']);
            break;

          default:
            break;
        }
        // this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'Login Failed. Please check your credentials.';
      },
    });
  }
}
