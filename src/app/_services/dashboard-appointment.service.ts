import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationResponse } from '../_interfaces/response/PaginationResponse';

@Injectable({
  providedIn: 'root'
})
export class DashboardAppointmentService {

  private baseUrl = 'https://localhost:7047/api/Appointments/admin/GetAll';
  constructor(private http: HttpClient) {}
  getAll(PageSize: number , PageIndex:number, DoctorId:any) {
    return this.http.get<{ data : PaginationResponse<any>}>(
      `${this.baseUrl}?PageSize=${PageSize}&PageIndex=${PageIndex}&DoctorId=${DoctorId}`
    );
  }

  getAllP(PageSize: number , PageIndex:number, PatientId:any) {
    return this.http.get<{ data : PaginationResponse<any>}>(
      `${this.baseUrl}?PageSize=${PageSize}&PageIndex=${PageIndex}&PatientId=${PatientId}`
    );
  }

  getAlll(PageSize: number , PageIndex:number) {
    return this.http.get<{ data : PaginationResponse<any>}>(
      `${this.baseUrl}?PageSize=${PageSize}&PageIndex=${PageIndex}`
    );
  }
}
