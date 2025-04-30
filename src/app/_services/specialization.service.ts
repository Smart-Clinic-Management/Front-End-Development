import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpecialization } from '../_interfaces/ispecialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  private baseUrl = 'https://localhost:7047/api/Specialization';
  constructor(private http: HttpClient) { }

  getAllSpecialization(): Observable<{ data: ISpecialization[] }> {
    return this.http.get<{ data: ISpecialization[] }>(`${this.baseUrl}/GetAll`);
  }
  getSpecializationDetails(id: number): Observable<{ data: ISpecialization }> {
      return this.http.get<{ data: ISpecialization }>(`${this.baseUrl}/${id}`);
    }
}
