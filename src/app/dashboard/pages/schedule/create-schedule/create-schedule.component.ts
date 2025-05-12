import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class CreateScheduleComponent implements OnInit {
  scheduleForm!: FormGroup;
  submitted = false;
  successMsg = '';
  serverErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.scheduleForm = this.fb.group(
      {
        doctorId: [null, [Validators.required, Validators.min(1)]],
        dayOfWeek: [0, [Validators.required, Validators.min(0), Validators.max(6)]],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        slotDuration: [null, [Validators.required, Validators.min(5), Validators.max(60)]],
      },
      {
        validators: this.durationValidator
      }
    );

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const doctorId = +idParam;
        this.scheduleForm.patchValue({ doctorId });
      }
    });
  }

  durationValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startTime')?.value;
    const end = group.get('endTime')?.value;

    if (!start || !end) return null;

    const startDate = new Date(`2020-01-01T${start}`);
    const endDate = new Date(`2020-01-01T${end}`);

    if (endDate <= startDate) {
      return { endBeforeStart: true };
    }

    const diffInHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    if (diffInHours < 2) {
      return { durationTooShort: true };
    }

    return null;
  }

  get f() {
    return this.scheduleForm.controls;
  }

  createSchedule() {
    this.submitted = true;
    if (this.scheduleForm.invalid) return;
    this.successMsg = '';

    if (this.scheduleForm.valid) {
      const params = {
        DoctorId: this.scheduleForm.value.doctorId,
        DayOfWeek: this.scheduleForm.value.dayOfWeek,
        StartTime: this.scheduleForm.value.startTime,
        EndTime: this.scheduleForm.value.endTime,
        SlotDuration: this.scheduleForm.value.slotDuration
      };
      this.http
        .post('https://localhost:7047/api/DoctorSchedule', null, { params })
        .subscribe({
          next: (response: any) => {
            if (response?.statusCode === 201 || response?.data) {
              this.successMsg = 'Schedule created successfully';
              this.scheduleForm.reset();
              this.submitted = false;
              this.serverErrors = [];
            } else {
              this.successMsg = '';
              this.serverErrors = [response?.message || 'Unknown error occurred.'];
            }
          },
          error: (err) => {
            const response = err.error;
            this.serverErrors = [];
            if (response?.message && response.message !== 'Bad Request') {
              this.serverErrors.push(response.message);
            }
            if (response?.errors && Array.isArray(response.errors)) {
              this.serverErrors.push(...response.errors);
            }
            if (this.serverErrors.length === 0) {
              this.serverErrors = ['Something went wrong.'];
            }
          }
        });
    }
  }
}
