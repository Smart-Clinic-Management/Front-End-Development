import { Component} from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/website/css/bootstrap.min.css','./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Login Failed. Please check your credentials.';
      }
    });
  }
}
