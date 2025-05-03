import { Component, inject } from '@angular/core';
import { IpatientListItem } from '../../../../_interfaces/ipatient-list-item';
import { PatientService } from '../../../../_services/patient.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-patients',
  imports: [RouterLink],
  templateUrl: './all-patients.component.html',
  styleUrl: './all-patients.component.css'
})
export class AllPatientsComponent {
  patients: IpatientListItem[] = [];
  patientService = inject(PatientService);

  constructor() { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe(
      (data) => {
        this.patients = data?.data ?? [];
        console.log('Patients:', this.patients);
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }
}
