import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDoctorListItem } from '../_interfaces/idoctor-list-item';
import { IDoctorDetails } from '../_interfaces/idoctor-details';
import { DoctorSchedual } from '../_interfaces/DoctorSchedual';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = 'https://localhost:7047/api/doctors';
  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<{ data: IDoctorListItem[] }> {
    return this.http.get<{ data: IDoctorListItem[] }>(`${this.baseUrl}/GetAll`);
  }

  getDoctorDetails(id: number): Observable<{ data: IDoctorDetails }> {
    return this.http.get<{ data: IDoctorDetails }>(`${this.baseUrl}/${id}`);
  }

  addDoctor(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Create`, formData);
  }

  updateDoctor(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/Update/${id}`, formData);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  GetDoctorWithAppointments(doctorId:number){
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}` ; 
    console.log(date);
       
    return this.http.get<{ data: DoctorSchedual}>(`${this.baseUrl}/schedule/?id=${doctorId}&startDate=${date}`);
  }

  GetDoctorSchedule(doctorId:number){
    return this.http.get<{ data: any[]}>(`https://localhost:7047/api/DoctorSchedule/GetByDoctor/${doctorId}`);
  }
}