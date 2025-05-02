import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DoctorComponent } from '../doctor/doctor.component';
import { ISpecialization } from '../../../../_interfaces/ispecialization';
import { SpecializationService } from '../../../../_services/specialization.service';

@Component({
  selector: 'app-specialization-doctors',
  imports: [RouterLink, DoctorComponent],
  templateUrl: './specialization-doctors.component.html',
  styleUrl: './specialization-doctors.component.css'
})
export class SpecializationDoctorsComponent {
  specializationId: number | null = null;
  specializationDetails: any | null = null;
  constructor(private specializationService: SpecializationService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.specializationId = +idParam;
        this.loadSpecializationDetails(this.specializationId);
      }
    });
  }

  loadSpecializationDetails(id: number) {
    if (id) {
      this.specializationService.getSpecializationDetails(id).subscribe(
        (data) => {
          this.specializationDetails = data?.data ?? null;
          console.log('Specialization:', this.specializationDetails);
        },
        (error) => {
          console.error('Error fetching doctor details:', error);
        }
      );
    }
  }
}
