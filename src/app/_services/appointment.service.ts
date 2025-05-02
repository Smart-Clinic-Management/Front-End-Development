import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatientAppointment } from '../_interfaces/IPatientAppointment';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'https://localhost:7047/api/Appointments/GetPatientAppointments/';
  constructor(private http: HttpClient) { }


  GetPatientAppointment(id:string){
    return this.http.get<IPatientAppointment>(this.baseUrl+id)
  }
  
}
