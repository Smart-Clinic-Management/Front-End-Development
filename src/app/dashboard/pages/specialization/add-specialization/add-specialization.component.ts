import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecializationService } from '../../../../_services/specialization.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-specialization',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-specialization.component.html',
  styleUrl: './add-specialization.component.css'
})
export class AddSpecializationComponent {
  specializationForm: FormGroup;
  submitted = false;
  serverErrors: string[] = [];
  successMsg = '';
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private service: SpecializationService) {
    this.specializationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      image: [null, Validators.required],
    });
  }

  get f() {
    return this.specializationForm.controls;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(file.type)) {
        this.f['image'].setErrors({ invalidType: true });
        this.selectedFile = null;
        return;
      }

      if (file.size > maxSize) {
        this.f['image'].setErrors({ maxSizeExceeded: true });
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      this.f['image'].setErrors(null);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.serverErrors = [];
    this.successMsg = '';

    if (this.specializationForm.invalid || !this.selectedFile) {
      if (!this.selectedFile) {
        this.serverErrors.push('Image is required.');
      }
      return;
    }

    const formData = new FormData();
    formData.append('name', this.specializationForm.value.name);
    formData.append('description', this.specializationForm.value.description);
    formData.append('image', this.selectedFile);

    this.service.createSpecialization(formData).subscribe({
      next: () => {
        this.successMsg = 'Added successfully';
        this.specializationForm.reset();
        this.selectedFile = null;
        this.submitted = false;
      },
      error: (err) => {
        if (err.error?.errors && Array.isArray(err.error.errors)) {
          this.serverErrors = err.error.errors;
        } else if (typeof err.error === 'string') {
          this.serverErrors.push(err.error);
        } else {
          this.serverErrors.push('Something went wrong.');
        }
      },
    });
  }
}
