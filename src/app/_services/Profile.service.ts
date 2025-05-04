import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDoctorProfile } from '../_interfaces/IDoctorProfile';
import { IPatientProfile } from '../_interfaces/IPaatientProfile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'https://localhost:7047/api/auth/';
  constructor(private http: HttpClient) {}

  Token: string = localStorage.getItem('token')!;

  GetDoctorProfile() {
    return this.http.get<IDoctorProfile>(this.baseUrl + 'profile' );
  }
  
  GetPatientProfile() {
    return this.http.get<IPatientProfile>(this.baseUrl + 'profile');
  }

  UpdateProfileImg(formData: FormData) {
    return this.http.post<{ data: { profileImg: string } }>(
      this.baseUrl + 'Update_ProfileImg',
      formData
    );
  }
}
