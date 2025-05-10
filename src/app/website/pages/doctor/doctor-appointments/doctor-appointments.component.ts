import { Component, NgModule, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../_services/Appointment.service';
import { AuthService } from '../../../../_services/auth.service';
import { CommonModule } from '@angular/common';
import { IDoctorAppointmentNew } from '../../../../_interfaces/IDocAppNew';
import { IApiResponse } from '../../../../_interfaces/response/IPatientAppRespone';
import { IDoctorPagination } from '../../../../_interfaces/IDocPage';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-appointments',
  imports: [CommonModule , FormsModule],
  templateUrl: './doctor-appointments.component.html',
  styleUrl: './doctor-appointments.component.css',
})
export class DoctorAppointmentsComponent implements OnInit {
  constructor(
    public AppointmentService: AppointmentService,
    private AuthService: AuthService
  ) {}

  isLoading:boolean = true ;

 appointments: IDoctorAppointmentNew[] = [];
 selectedStatus: 'All' | 'Pending' | 'Completed' | 'Canceled' = 'All';
 filteredAppointments: IDoctorAppointmentNew[] = [];

ngOnInit(): void {
    this.AppointmentService.GetDoctorAppointments().subscribe(
    (res: IApiResponse<IDoctorPagination>) => {
      this.appointments = res.data.data;
      console.log(this.appointments);
      
      this.filterAppointments();
      this.isLoading = false;
    },
    (error) => {
      console.error('Error fetching doctor appointments:', error);
      this.isLoading = false;
    }
  );
  }

  getAppointments() {
  this.isLoading = true;
  this.AppointmentService.GetDoctorAppointments().subscribe(
    (res: IApiResponse<IDoctorPagination>) => {
      console.log(0);
      
      this.appointments = res.data.data;
      console.log(this.appointments); // التأكد من أن البيانات يتم تحميلها بشكل صحيح
      this.isLoading = false;
    },
    (error) => {
      console.error('Error fetching doctor appointments:', error);
      this.isLoading = false;
    }
  );
}
filterAppointments() {
  if (this.selectedStatus === 'All') {
    this.filteredAppointments = this.appointments;
  } else {
    this.filteredAppointments = this.appointments.filter(
      app => app.status === this.selectedStatus
    );
  }
}

error:string = "" ;
changeAppointmentStatus(appointmentId: number, status: 'Completed' | 'Canceled') {
  const payload = { appointmentId, status };

  this.AppointmentService.updateDoctorAppointment(payload).subscribe({
    next: (res) => {
      console.log('Appointment status updated:', res);
      this.getAppointments(); 
    },
    error: (err) => {
      console.error('Error updating appointment:', err);
      this.error = "can not update for upcomming appointment"
      if (err?.error?.errors) {
        console.log('Validation Errors:', err.error.errors);
      } else {
        alert('An error occurred while updating the appointment.');
      }
    }
  });
}


}
