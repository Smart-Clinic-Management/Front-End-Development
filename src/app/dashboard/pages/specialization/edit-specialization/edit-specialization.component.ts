import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecializationService } from '../../../../_services/specialization.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-specialization',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-specialization.component.html',
  styleUrl: './edit-specialization.component.css'
})
export class EditSpecializationComponent {
  specializationForm!: FormGroup;
  submitted = false;
  selectedFile!: File;
  successMsg = '';
  serverErrors: string[] = [];
  specializationId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private specializationService: SpecializationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.specializationId = +this.route.snapshot.paramMap.get('id')!;
    this.specializationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      image: [null]
    });

    this.loadSpecialization();
  }

  get f() {
    return this.specializationForm.controls;
  }

  loadSpecialization() {
    this.specializationService.getSpecializationDetails(this.specializationId).subscribe({
      next: (data) => {
        this.specializationForm.patchValue({
          name: data.data.name,
          description: data.data.description
        });
      },
      error: (err) => {
        console.error('Error loading specialization:', err);
      }
    });
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

    this.specializationService.updateSpecialization(this.specializationId, formData).subscribe({
      next: () => {
        this.successMsg = 'Specialization updated successfully';
        this.serverErrors = [];
        this.submitted = false;
      },
      error: (err) => {
        this.serverErrors = [];
        if (err.error && err.error.errors) {
          for (const key in err.error.errors) {
            this.serverErrors.push(...err.error.errors[key]);
          }
        } else {
          this.serverErrors.push('Something went wrong.');
        }
      }
    });
  }
}
