import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../_services/auth.service';
import { AppointmentService } from '../../../../_services/Appointment.service';
import { CommonModule } from '@angular/common';
import { IPatientAppointment } from '../../../../_interfaces/IPatientAppointment';

@Component({
  selector: 'app-patient-appointments',
  imports: [CommonModule],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css',
})
export class PatientAppointmentsComponent implements OnInit {


  appointments: IPatientAppointment|null  = null ; 

  constructor(
    private authServie: AuthService,
    private appointmentService: AppointmentService
  ) {}
  ngOnInit(): void {
    const id = this.authServie.GetId();

    this.appointmentService.GetPatientAppointment(id!).subscribe((res) => {
      this.appointments! = res ;
      // console.log(this.appointments?.data);
      
    });
  }
}
