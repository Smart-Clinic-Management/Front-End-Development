import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../_services/auth.service';
import { AppointmentService } from '../../../../_services/Appointment.service';
import { CommonModule } from '@angular/common';
import { IPatientAppointment } from '../../../../_interfaces/IPatientAppointment';
import { IApiResponse } from '../../../../_interfaces/response/IPatientAppRespone';
import { IPatientAppointmentNew } from '../../../../_interfaces/IPatientAppointmentNew';
import { IAppointment } from '../../../../_interfaces/IAppointment';

@Component({
  selector: 'app-patient-appointments',
  imports: [CommonModule],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css',
})
export class PatientAppointmentsComponent implements OnInit {


  appointments: IAppointment[] = [];

  constructor(
    private authServie: AuthService,
    private appointmentService: AppointmentService
  ) {}
 ngOnInit(): void {
    this.appointmentService.GetPatientAppointment().subscribe(
      (res: IApiResponse<IPatientAppointmentNew>) => {
        this.appointments = res.data.data;
        console.log(this.appointments);
      },
    );
  }
}
