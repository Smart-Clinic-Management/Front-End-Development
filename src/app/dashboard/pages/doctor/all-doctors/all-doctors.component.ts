import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorService } from '../../../../_services/doctor.service';
import { IDoctorListItem } from '../../../../_interfaces/idoctor-list-item';

@Component({
  selector: 'app-all-doctors',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './all-doctors.component.html',
  styleUrl: './all-doctors.component.css'
})
export class AllDoctorsComponent implements OnInit{
  doctors: IDoctorListItem[] = [];
  doctorService = inject(DoctorService);

  // constructor() { }

  ngOnInit(): void {
    // this.loadDoctors();
  }

  // // loadDoctors() {
  // //   this.doctorService.getAllDoctors().subscribe(
  // //     (data) => {
  // //       this.doctors = data?.data ?? [];
  // //       console.log('Doctors:', this.doctors);
  // //     },
  // //     (error) => {
  // //       console.error('Error fetching doctors:', error);
  // //     }
  // //   );
  // // }

  // confirmDelete(id: number) {
  //   if (confirm('Are you sure you want to delete this doctor?')) {
  //     this.doctorService.deleteDoctor(id).subscribe({
  //       next: () => {
  //         this.loadDoctors();
  //       },
  //       error: (err) => {
  //         console.error('Error deleting doctor:', err);
  //       }
  //     });
  //   }
  // }
}