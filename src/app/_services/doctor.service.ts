import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDoctorListItem } from '../_interfaces/idoctor-list-item';
import { IDoctorDetails } from '../_interfaces/idoctor-details';
import { DoctorSchedual } from '../_interfaces/DoctorSchedual';
import { PaginationResponse } from '../_interfaces/response/PaginationResponse';
import { AllDoctorsPagination } from '../_interfaces/response/Doctor/AllDoctorsPagination';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = 'https://localhost:7047/api/doctors';
  constructor(private http: HttpClient) {}

  getAllDoctors(params:string) {

    console.log(params);

    return this.http.get<{ data: PaginationResponse<AllDoctorsPagination>}>(
      `${this.baseUrl}?${params}`
    );
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

  GetDoctorWithAppointments(doctorId: number) {
    const current = new Date();
    const date = `${current.getFullYear()}-${
      current.getMonth() < 10 ? '0'+(current.getMonth() + 1) : (current.getMonth() + 1) 
    }-${
      current.getDate() < 10 ? '0'+(current.getDate()) : (current.getDate()) 
    }`;
    console.log(date);
// Doctors/schedule/slots

    return this.http.get<{ data: DoctorSchedual }>(
      `${this.baseUrl}/schedule/slots?DoctorId=${doctorId}&startDate=${date}`
    );
  }

  GetDoctorSchedule(doctorId: number) {
    return this.http.get<{ data: any[] }>(
      `https://localhost:7047/api/DoctorSchedule/GetByDoctor/${doctorId}`
    );
  }
}
