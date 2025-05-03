import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      doctorId: [null, Validators.required],
      dayOfWeek: [null, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      slotDuration: [null, [Validators.required, Validators.min(1)]],
    });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const doctorId = +idParam;
        this.scheduleForm.patchValue({ doctorId });
      }
    });
  }

  get f() {
    return this.scheduleForm.controls;
  }

  createSchedule() {
    this.submitted = true;
    this.successMsg = '';

    if (this.scheduleForm.valid) {
      this.http
        .post('https://localhost:7047/api/DoctorSchedule', this.scheduleForm.value)
        .subscribe({
          next: () => {
            this.successMsg = 'Schedule created successfully';
            this.scheduleForm.reset();
            this.submitted = false;
          },
          error: (err) => console.error('Error:', err),
        });
    }
  }
}
