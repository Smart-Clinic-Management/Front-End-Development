import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../_interfaces/response/PaginationResponse';
import { AllPatientPagination } from '../_interfaces/response/Patient/all-patient-pagination';
import { IpatientDetails } from './../_interfaces/ipatient-details';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'https://localhost:7047/api/patients';
  constructor(private http: HttpClient) { }

  getAllPatients(params:string) {
    console.log(params);
    return this.http.get<{ data: PaginationResponse<AllPatientPagination>}>(
      `${this.baseUrl}?${params}`
    );
  }

  getPatientDetails(id: number): Observable<{ data: IpatientDetails }> {
    return this.http.get<{ data: IpatientDetails }>(`${this.baseUrl}/${id}`);
  }
}
