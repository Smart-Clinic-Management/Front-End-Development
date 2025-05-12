import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../_services/doctor.service'; // تأكد من المسار الصحيح للـ Service
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IDoctorDetails } from '../../../../_interfaces/idoctor-details';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css'
})
export class DoctorDetailsComponent implements OnInit{
  doctorId: number | null = null;
  doctorDetails: IDoctorDetails | null = null;
  serverErrors: string[] = [];
  successMsg: string | null = null;

  constructor(private doctorService: DoctorService,private route: ActivatedRoute,private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.doctorId = +idParam;
        this.loadDoctorDetails(this.doctorId);
      }
    });
  }

  loadDoctorDetails(id: number) {
    if (id) {
      this.doctorService.getDoctorDetails(id).subscribe(
        (data) => {
          this.doctorDetails = data?.data ?? null;
          console.log('Doctor:', this.doctorDetails);
        },
        (error) => {
          if (error.status === 404) {
            this.router.navigate(['/not-found']);
            this.doctorDetails = null;
          } else {
            console.error('Error fetching doctor details:', error);
          }
        }
      );
    }
  }

  goToAppointments() {
    this.router.navigate(['/dashboard/doctors/appointments'], {
      state: { doctorId: this.doctorId },
    });
  }

  deleteSchedule(scheduleId:number, doctorId: number){
    if (confirm('Are you sure you want to delete this schedulr?')) {
      console.log("scheduleId : ",scheduleId," doctorId : ",doctorId);
      this.http.delete(`https://localhost:7047/api/DoctorSchedule`, {
        params: {
          ScheduleId: scheduleId.toString(),
          DoctorId: doctorId.toString()
        }
      }).subscribe({
        next: (res: any) => {
          this.successMsg = 'Schedule deleted successfully';
          this.serverErrors = [];
          this.loadDoctorDetails(doctorId); // إعادة تحميل البيانات بعد الحذف
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
