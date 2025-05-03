import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IpatientListItem } from '../_interfaces/ipatient-list-item';
import { IpatientDetails } from '../_interfaces/ipatient-details';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'https://localhost:7047/api/patients';
  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<{ data: IpatientListItem[] }> {
    return this.http.get<{ data: IpatientListItem[] }>(`${this.baseUrl}/GetAll`);
  }

  getPatientDetails(id: number): Observable<{ data: IpatientDetails }> {
    return this.http.get<{ data: IpatientDetails }>(`${this.baseUrl}/GetById/${id}`);
  }
}
