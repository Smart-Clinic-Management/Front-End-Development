import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../_services/Appointment.service';
import { AuthService } from '../../../../_services/auth.service';
import { IDoctorAppointments } from '../../../../_interfaces/IDoctorAppointments';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-appointments',
  imports: [CommonModule],
  templateUrl: './doctor-appointments.component.html',
  styleUrl: './doctor-appointments.component.css',
})
export class DoctorAppointmentsComponent implements OnInit {
  constructor(
    private AppointmentService: AppointmentService,
    private AuthService: AuthService
  ) {}

  doctorAppointments!: IDoctorAppointments ;
  isLoading:boolean = true ;

  ngOnInit(): void {
    this.AppointmentService.GetDoctorAppointment(this.AuthService.GetId()!).subscribe((res) => {      
      this.isLoading =false ;
      this.doctorAppointments = res ;
    });
  }
}
