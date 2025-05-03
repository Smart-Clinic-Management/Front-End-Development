import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatientAppointment } from '../_interfaces/IPatientAppointment';
import { IDoctorAppointments } from '../_interfaces/IDoctorAppointments';
import { IAppointmentRequest } from './../_interfaces/IAppointmentsRequest';

@Injectable({
  providedIn: 'root',
})

export class AppointmentService {
  private baseUrl = 'https://localhost:7047/api/Appointments';
  constructor(private http: HttpClient) {}

  GetPatientAppointment(id: string) {
    return this.http.get<IPatientAppointment>(
      this.baseUrl + '/GetPatientAppointments/' + id
    );
  }

  GetDoctorAppointment(id: string) {
    return this.http.get<IDoctorAppointments>(
      this.baseUrl + '/GetDoctorAppointments/' + id
    );
  }
  
  CreateAppointment(appointmet: IAppointmentRequest) {
    return this.http.post(this.baseUrl, appointmet, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}
