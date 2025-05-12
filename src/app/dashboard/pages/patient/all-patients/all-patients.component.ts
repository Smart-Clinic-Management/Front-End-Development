import { Component, inject } from '@angular/core';
import { IpatientListItem } from '../../../../_interfaces/ipatient-list-item';
import { PatientService } from '../../../../_services/patient.service';
import { Router, RouterLink, RouterModule,ActivatedRoute } from '@angular/router';
import { PaginationResponse } from '../../../../_interfaces/response/PaginationResponse';
import { AllPatientPagination } from '../../../../_interfaces/response/Patient/all-patient-pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-patients',
  imports: [RouterLink,RouterModule,CommonModule],
  templateUrl: './all-patients.component.html',
  styleUrl: './all-patients.component.css'
})
export class AllPatientsComponent {
  patientService = inject(PatientService);
  patients!: PaginationResponse<AllPatientPagination>;
  isLoading: boolean = true;
  currentIndex= 1;
  param = '?';

  constructor(private ActivatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.ActivatedRoute.queryParams.subscribe((params) => {
      this.isLoading = true;
      this.param = '';
      let pageIndex = `pageIndex=${params['pageIndex'] || 1}`;
      this.param = this.param.concat(pageIndex);
      this.currentIndex = Number(pageIndex) ;
      this.loadPatients();
    });
  }

  loadPatients() {
    this.patientService.getAllPatients(this.param).subscribe(
      (data) => {
        this.patients = data.data;
        console.log('Doctors:', this.patients.data);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
        this.isLoading = false;
      }
    );
  }
  goToPage(page: number) {
    console.log(page);

    this.router.navigate([], {
      relativeTo: this.ActivatedRoute,
      queryParams: {
        pageIndex: page,
      },
      queryParamsHandling: 'merge',
    });
  }
}
