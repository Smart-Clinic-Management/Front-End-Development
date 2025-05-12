// add-doctor.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../../../../_services/doctor.service';
import { CommonModule } from '@angular/common';
import { SpecializationService } from '../../../../_services/specialization.service';
import { PaginationResponse } from '../../../../_interfaces/response/PaginationResponse';
import { AllSpecializations } from '../../../../_interfaces/response/Specialization/AllSpecializations';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent {
  doctorForm: FormGroup;
  submitted = false;
  successMsg = '';
  selectedFile!: File;

  specializations!: PaginationResponse<AllSpecializations>;
  serverErrors: string[] = [];
  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private specializationService: SpecializationService
  ) {
    this.doctorForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\+20\d{10}$/)
      ]],
      specializationId: ['', Validators.required],
      birthDate: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      waitingTime: [null, [Validators.required, Validators.min(0), Validators.max(30)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      image: [null, Validators.required]
    });
  }

  get f() {
    return this.doctorForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const isValidExt = /\.(jpg|jpeg|png)$/i.test(file.name);
      const isValidSize = file.size <= 2 * 1024 * 1024;

      if (!isValidExt || !isValidSize) {
        this.doctorForm.get('image')?.setErrors({ invalidFile: true });
        return;
      }

      this.selectedFile = file;
      this.doctorForm.patchValue({ image: file });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.doctorForm.invalid) return;

    const formData = new FormData();
    for (const key in this.doctorForm.value) {
      if (key === 'image') formData.append(key, this.selectedFile);
      else formData.append(key, this.doctorForm.value[key]);
    }

    this.doctorService.addDoctor(formData).subscribe({
      next: () => {
        this.successMsg = 'Added successfully';
        this.doctorForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        if (err.error?.errors && Array.isArray(err.error.errors)) {
          this.serverErrors = err.error.errors;
        } else {
          this.serverErrors = ['Something went wrong.'];
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadSpecializations();
  }

  loadSpecializations() {
    this.specializationService.getAllSpecializationsPaginated(20, 1).subscribe({
      next: (response) => {
        this.specializations = response.data;
      },
      error: (err) => {
        console.error('Error fetching specializations:', err);
      }
    });
  }
}
