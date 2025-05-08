import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../../_services/doctor.service';
import { CommonModule } from '@angular/common';
import { SpecializationService } from '../../../../_services/specialization.service';
import { ISpecialization } from '../../../../_interfaces/ispecialization';

@Component({
  selector: 'app-add-doctor',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent {
  doctorForm: FormGroup;
  submitted = false;
  successMsg = '';
  selectedFile!: File;

  constructor(private fb: FormBuilder, private doctorService: DoctorService, private specializationService: SpecializationService) {
    this.doctorForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specializationId: ['', Validators.required],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      waitingTime: [, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  get f() {
    return this.doctorForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.doctorForm.patchValue({ image: file });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.doctorForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('fname', this.doctorForm.value.fname);
    formData.append('lname', this.doctorForm.value.lname);
    formData.append('email', this.doctorForm.value.email);
    formData.append('specializationId', this.doctorForm.value.specializationId);
    formData.append('birthDate', this.doctorForm.value.birthDate);
    formData.append('address', this.doctorForm.value.address);
    formData.append('waitingTime', this.doctorForm.value.waitingTime);
    formData.append('description', this.doctorForm.value.description);
    formData.append('image', this.selectedFile);

    this.doctorService.addDoctor(formData).subscribe({
      next: () => {
        this.successMsg = 'Added successfully';
        this.doctorForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  specializations: ISpecialization[] = [];

  ngOnInit(): void {
    this.loadSpecializations();
  }

  loadSpecializations() {
    // this.specializationService.getAllSpecialization().subscribe(
    //   (data) => {
    //     this.specializations = data?.data ?? [];
    //     console.log('Specializations:', this.specializations);
    //   },
    //   (error) => {
    //     console.error('Error fetching Specializations:', error);
    //   }
    // );
  }
}
