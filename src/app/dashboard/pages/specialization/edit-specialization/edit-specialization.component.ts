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
  successMsg = '';
  selectedFile: File | null = null;
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
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null]
    });

    this.specializationService.getSpecializationDetails(this.specializationId).subscribe({
      next: (res) => {
        const specialization = res.data;
        this.specializationForm.patchValue({
          name: specialization.name,
          description: specialization.description
        });
      },
      error: (err) => console.error(err)
    });
  }

  get f() {
    return this.specializationForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
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
        this.router.navigate(['/dashboard/specializations']);
      },
      error: (err) => console.error(err)
    });
  }
}
