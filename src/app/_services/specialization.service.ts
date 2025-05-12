import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpecialization, ISpecializationDoctor } from '../_interfaces/ispecialization';
import { PaginationResponse } from '../_interfaces/response/PaginationResponse';
import { AllSpecializations } from '../_interfaces/response/Specialization/AllSpecializations';
import { ISpecializationDoctors } from '../_interfaces/response/Specialization/ISpecializationDoctors';

@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
  getAll() {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'https://localhost:7047/api/Specializations';
  constructor(private http: HttpClient) {}

  getAllSpecialization(): Observable<{ data: ISpecialization[] }> {
    console.log('try');
    return this.http.get<{ data: ISpecialization[] }>(`${this.baseUrl}/GetAll`);
  }

  getAllSpecializations(PageSize: number) {
    return this.http.get<{ data: { data: AllSpecializations[] } }>(
      `${this.baseUrl}?PageSize=${PageSize}`
    );
  }


  getAllSpecializationsPaginated(PageSize: number , PageIndex:number) {
    return this.http.get<{ data : PaginationResponse<AllSpecializations>}>(
      `${this.baseUrl}?PageSize=${PageSize}&PageIndex=${PageIndex}`
    );
  }

  getSpecializationDoctors(id: number): Observable<{ data: ISpecializationDoctors }> {
    return this.http.get<{ data: ISpecializationDoctors }>(`${this.baseUrl}/${id}`);
  }


  getSpecializationDetails(id: number): Observable<{ data: ISpecialization }> {
    return this.http.get<{ data: ISpecialization }>(`${this.baseUrl}/${id}`);
  }

  createSpecialization(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formData);
  }

  updateSpecialization(id: number, data: FormData) {
    return this.http.put<any>(`${this.baseUrl}/Update/${id}`, data);
  }

  deleteSpecialization(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
