import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../../_services/doctor.service';
import { SpecializationService } from '../../../../_services/specialization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-doctor',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.css'
})
export class EditDoctorComponent {
  doctorForm!: FormGroup;
  submitted = false;
  successMsg = '';
  selectedFile!: File;
  doctorId!: number;
  specializations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private specializationService: SpecializationService
  ) {}

  ngOnInit(): void {
    this.doctorId = +this.route.snapshot.params['id'];

    this.doctorForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: [null],
      specializationId: ['', Validators.required],
      address: ['', Validators.required],
      waitingTime: [, [Validators.required, Validators.min(1)]],
      description: ['']
    });

    this.loadDoctor();
    this.loadSpecializations();
  }

  get f() {
    return this.doctorForm.controls;
  }

  loadDoctor() {
    this.doctorService.getDoctorDetails(this.doctorId).subscribe({
      next: (res) => {
        const doctor = res.data;
        console.log('Doctor data:', doctor);
        this.doctorForm.patchValue({
          fname: doctor.firstName,
          lname: doctor.lastName,
          email: doctor.userEmail,
          address: doctor.address,
          waitingTime: doctor.waitingTime,
          description: doctor.description,
          specializationId: doctor.specializationId
        });
      },
      error: (err) => {
        console.error('Error loading doctor:', err);
      }
    });
  }

  loadSpecializations() {
    this.specializationService.getAllSpecialization().subscribe({
      next: (res) => {
        this.specializations = res.data;
      },
      error: (err) => {
        console.error('Error loading specializations:', err);
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.doctorForm.patchValue({ image: file });
    }
  }

  onSubmit() {
    console.log('Form values:', this.doctorForm.value);
  this.submitted = true;

  if (this.doctorForm.invalid) {
    console.log('Form errors:', this.doctorForm.errors);
    return;
  }

    if (this.doctorForm.invalid) return;

    const formData = new FormData();
    formData.append('fname', this.doctorForm.value.fname);
    formData.append('lname', this.doctorForm.value.lname);
    formData.append('email', this.doctorForm.value.email);
    formData.append('address', this.doctorForm.value.address);
    formData.append('waitingTime', this.doctorForm.value.waitingTime);
    formData.append('description', this.doctorForm.value.description);
    formData.append('specializationId', this.doctorForm.value.specializationId);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.doctorService.updateDoctor(this.doctorId, formData).subscribe({
      next: () => {
        this.successMsg = 'Doctor updated successfully';
        this.router.navigate(['/dashboard/doctors']);
      },
      error: (err) => {
        console.error('Error updating doctor:', err);
      }
    });
  }
}
