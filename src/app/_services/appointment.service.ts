import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatientAppointment } from '../_interfaces/IPatientAppointment';
<<<<<<< HEAD
=======
import { IDoctorAppointments } from '../_interfaces/IDoctorAppointments';
>>>>>>> b857ca8f26b022d3301e33f4dd709e0676dfe5d2


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

<<<<<<< HEAD
  private baseUrl = 'https://localhost:7047/api/Appointments/GetPatientAppointments/';
  constructor(private http: HttpClient) { }


  GetPatientAppointment(id:string){
    return this.http.get<IPatientAppointment>(this.baseUrl+id)
=======
  private baseUrl = 'https://localhost:7047/api/Appointments/';
  constructor(private http: HttpClient) { }

  GetPatientAppointment(id:string){
    return this.http.get<IPatientAppointment>(this.baseUrl+"GetPatientAppointments/"+id)
  }

  GetDoctorAppointment(id:string){
    return this.http.get<IDoctorAppointments>(this.baseUrl+"GetDoctorAppointments/"+id)
>>>>>>> b857ca8f26b022d3301e33f4dd709e0676dfe5d2
  }
  
}
