import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpecialization } from '../_interfaces/ispecialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {
  getAll() {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'https://localhost:7047/api/Specialization';
  constructor(private http: HttpClient) { }

  getAllSpecialization(): Observable<{ data: ISpecialization[] }> {
    console.log("try");
    return this.http.get<{ data: ISpecialization[] }>(`${this.baseUrl}/GetAll`);
  }

  getSpecializationDetails(id: number): Observable<{ data: ISpecialization }> {
    return this.http.get<{ data: ISpecialization }>(`${this.baseUrl}/${id}`);
  }

  createSpecialization(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Create`, formData);
  }

  updateSpecialization(id: number, data: FormData) {
    return this.http.put<any>(`${this.baseUrl}/Update/${id}`, data);
  }

  deleteSpecialization(id: number) {
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }
}
