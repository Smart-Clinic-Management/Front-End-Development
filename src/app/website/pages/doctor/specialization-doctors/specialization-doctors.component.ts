import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DoctorComponent } from '../doctor/doctor.component';
import {
  ISpecialization,
  ISpecializationDoctor,
} from '../../../../_interfaces/ispecialization';
import { SpecializationService } from '../../../../_services/specialization.service';
import { ISpecializationDoctors } from '../../../../_interfaces/response/Specialization/ISpecializationDoctors';

@Component({
  selector: 'app-specialization-doctors',
  imports: [RouterLink, DoctorComponent],
  templateUrl: './specialization-doctors.component.html',
  styleUrl: './specialization-doctors.component.css',
})
export class SpecializationDoctorsComponent {
  specializationId: number | null = null;
  specializationDetails!: ISpecializationDoctors;

  isLoading = true;

  constructor(
    private specializationService: SpecializationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.specializationId = +idParam;
        this.loadSpecializationDetails(this.specializationId);
      }
    });
  }

  loadSpecializationDetails(id: number) {
    this.isLoading = true;
    if (id) {
      this.specializationService.getSpecializationDoctors(id).subscribe(
        (data) => {
          this.specializationDetails = data.data;
          this.isLoading = false;
          // console.log('Specialization:', this.specializationDetails);
        },
        (error) => {
          this.isLoading = false;
          // console.error('Error fetching doctor details:', error);
        }
      );
    }
  }
}
