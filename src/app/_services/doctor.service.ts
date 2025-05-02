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
    return this.http.post(`${this.baseUrl}`, formData);
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  GetDoctorWithAppointments(doctorId:number){
    return this.http.get<{ data: DoctorSchedual}>(`${this.baseUrl}/schedule/?id=${doctorId}`);
  }
}