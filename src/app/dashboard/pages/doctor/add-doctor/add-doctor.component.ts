import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../../_services/doctor.service';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder, private doctorService: DoctorService) {
    this.doctorForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialization: ['', Validators.required],
      bdate: ['', Validators.required],
      address: ['', Validators.required],
      waitingTime: [0, [Validators.required, Validators.min(1)]],
      desc: ['', Validators.required],
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
    formData.append('specialization', this.doctorForm.value.specialization);
    formData.append('bdate', this.doctorForm.value.bdate);
    formData.append('address', this.doctorForm.value.address);
    formData.append('waitingTime', this.doctorForm.value.waitingTime);
    formData.append('desc', this.doctorForm.value.desc);
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
}
