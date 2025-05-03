import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppointmentService } from '../../../../_services/Appointment.service';

@Component({
  selector: 'app-dashboard-doctor-appointment',
  imports: [CommonModule,RouterLink],
templateUrl: './dashboard-doctor-appointment.component.html',
  styleUrl: './dashboard-doctor-appointment.component.css'
})
export class DashboardDoctorAppointmentComponent {
  doctorId: number | null = null;
  doctorAppointments: any[] = [];
  constructor(private appointmentService: AppointmentService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.doctorId = +idParam;
        this.loadDoctorAppointments(this.doctorId);
      }
    });
  }
  loadDoctorAppointments(id: number) {
    this.appointmentService.GetDoctorAppointmentD(id).subscribe(
      (data) => {
        this.doctorAppointments = data?.data ?? [];
        console.log('Patients:', this.doctorAppointments);
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }
}
