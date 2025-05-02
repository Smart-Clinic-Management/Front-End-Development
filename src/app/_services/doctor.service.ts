import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDoctorListItem } from '../_interfaces/idoctor-list-item';
import { IDoctorDetails } from '../_interfaces/idoctor-details';

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
}