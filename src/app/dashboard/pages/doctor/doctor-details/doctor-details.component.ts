import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../_services/doctor.service'; // تأكد من المسار الصحيح للـ Service
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IDoctorDetails } from '../../../../_interfaces/idoctor-details';

@Component({
  selector: 'app-doctor-details',
  imports: [CommonModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.css'
})
export class DoctorDetailsComponent implements OnInit{
  doctorId: number | null = null;
  doctorDetails: IDoctorDetails | null = null;
  constructor(private doctorService: DoctorService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.doctorId = +idParam;
        this.loadDoctorDetails(this.doctorId);
      }
    });
  }

  loadDoctorDetails(id: number) {
    if (id) {
      this.doctorService.getDoctorDetails(id).subscribe(
        (data) => {
          this.doctorDetails = data?.data ?? null;
          console.log('Doctor:', this.doctorDetails);
        },
        (error) => {
          console.error('Error fetching doctor details:', error);
        }
      );
    }
  }
}
