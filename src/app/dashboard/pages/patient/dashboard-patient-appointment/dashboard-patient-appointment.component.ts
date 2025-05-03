import { Component } from '@angular/core';
import { IPatientAppointment } from '../../../../_interfaces/IPatientAppointment';
import { AppointmentService } from '../../../../_services/Appointment.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-patient-appointment',
  imports: [RouterLink,CommonModule],
  templateUrl: './dashboard-patient-appointment.component.html',
  styleUrl: './dashboard-patient-appointment.component.css'
})
export class DashboardPatientAppointmentComponent {
  patientId: number | null = null;
  patientAppointments: any[] = [];
  constructor(private appointmentService: AppointmentService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.patientId = +idParam;
        this.loadPatientAppointments(this.patientId);
      }
    });
  }
  loadPatientAppointments(id: number) {
    this.appointmentService.GetPatientAppointmentD(id).subscribe(
      (data) => {
        this.patientAppointments = data?.data ?? [];
        console.log('Patients:', this.patientAppointments);
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }
}
