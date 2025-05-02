import { Component, OnInit, inject } from '@angular/core';
import { DoctorComponent } from "../doctor/doctor.component";
import { DoctorService } from '../../../../_services/doctor.service';
import { IDoctorListItem } from '../../../../_interfaces/idoctor-list-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  imports: [DoctorComponent ,RouterLink],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit{
  doctors: IDoctorListItem[] = [];
  doctorService = inject(DoctorService);

  constructor() { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe(
      (data) => {
        this.doctors = data?.data ?? [];
        console.log('Doctors:', this.doctors);
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }
}
