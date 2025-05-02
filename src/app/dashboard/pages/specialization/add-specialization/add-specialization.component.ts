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
  specializationForm!: FormGroup;
  submitted = false;
  selectedFile!: File;
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private specializationService: SpecializationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.specializationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null]
    });
  }

  get f() {
    return this.specializationForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.specializationForm.patchValue({ image: file });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.specializationForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.specializationForm.value.name);
    formData.append('description', this.specializationForm.value.description);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.specializationService.createSpecialization(formData).subscribe({
      next: () => {
        this.successMsg = 'Specialization added successfully';
        this.specializationForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error('Error creating specialization:', err);
      }
    });
  }
}
