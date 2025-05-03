import { Component } from '@angular/core';
import { IpatientDetails } from '../../../../_interfaces/ipatient-details';
import { PatientService } from '../../../../_services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  imports: [CommonModule],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {
  patientId: number | null = null;
  patientDetails: IpatientDetails | null = null;
  constructor(private patientService: PatientService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.patientId = +idParam;
        this.loadPatientDetails(this.patientId);
      }
    });
  }

  loadPatientDetails(id: number) {
    if (id) {
      this.patientService.getPatientDetails(id).subscribe(
        (data) => {
          this.patientDetails = data?.data ?? null;
          console.log('Patient:', this.patientDetails);
        },
        (error) => {
          console.error('Error fetching patient details:', error);
        }
      );
    }
  }
}
