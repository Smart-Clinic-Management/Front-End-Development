import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['../../../assets/website/css/bootstrap.min.css', './register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;
  serverError = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      image: [null]
    }, { validators: this.passwordMatchValidator });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.serverError = '';

    if (this.registerForm.invalid) return;

    const formData = new FormData();
    formData.append('Firstname', this.registerForm.value.firstName);
    formData.append('Lastname', this.registerForm.value.lastName);
    formData.append('Email', this.registerForm.value.email);
    formData.append('Password', this.registerForm.value.password);
    formData.append('ConfirmPassword', this.registerForm.value.confirmPassword);
    formData.append('Address', this.registerForm.value.address);
    if (this.registerForm.value.image) {
      formData.append('Image', this.registerForm.value.image);
    }

    this.http.post('https://localhost:7047/api/Auth/register', formData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.serverError = err.error?.message || 'Registration failed'
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerForm.patchValue({ image: file });
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }
}
