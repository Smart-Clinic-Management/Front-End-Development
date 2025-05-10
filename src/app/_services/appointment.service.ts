import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatientAppointment } from '../_interfaces/IPatientAppointment';
import { IDoctorAppointments } from '../_interfaces/IDoctorAppointments';
import { IAppointmentRequest } from './../_interfaces/IAppointmentsRequest';
import { IApiResponse } from '../_interfaces/response/IPatientAppRespone';
import { IPatientAppointmentNew } from '../_interfaces/IPatientAppointmentNew';
import { IDoctorPagination } from '../_interfaces/IDocPage';
import { IUpdateAppointmentRequest } from '../_interfaces/IupdateApp';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'https://localhost:7047/api/Appointments';
  constructor(private http: HttpClient) {}

  GetPatientAppointment() {
    return this.http.get<IApiResponse<IPatientAppointmentNew>>(
      this.baseUrl + '/GetPatientAppointments'
    );
  }

  GetDoctorAppointments() {
    console.log(0);
    
    return this.http.get<IApiResponse<IDoctorPagination>>(
      this.baseUrl + '/GetDoctorAppointments',
      {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + localStorage.getItem('token')
        ),
      }
    );
  }
  updateDoctorAppointment(data: IUpdateAppointmentRequest) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    headers.set('Content-Type', 'application/json');

    console.log(data);

    return this.http.put<IApiResponse<string>>(
      'https://localhost:7047/api/Appointments/doctor',
      {
        appointmentId: data.appointmentId,
        status: data.status == "Completed" ?  2: 1,
      },
      { headers }
    );
  }

  CreateAppointment(appointmet: IAppointmentRequest) {
    console.log(appointmet);

    return this.http.post(this.baseUrl, appointmet, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  GetPatientAppointmentD(id: number) {
    return this.http.get<IPatientAppointment>(
      this.baseUrl + '/GetPatientAppointments/' + id
    );
  }

  GetDoctorAppointmentD(id: number) {
    return this.http.get<IDoctorAppointments>(
      this.baseUrl + '/GetDoctorAppointments/' + id
    );
  }
}
