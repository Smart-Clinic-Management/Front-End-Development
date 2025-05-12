import { Component, inject } from '@angular/core';
import { DashboardAppointmentService } from '../../../../_services/dashboard-appointment.service';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationResponse } from '../../../../_interfaces/response/PaginationResponse';

@Component({
  selector: 'app-dashboard-patient-appointment',
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard-patient-appointment.component.html',
  styleUrl: './dashboard-patient-appointment.component.css'
})
export class DashboardPatientAppointmentComponent {
  patientId: number | null = null;
  patientAppointments!: PaginationResponse<any>;
  router = inject(Router);
  isLoading = true;
  currentPageIndex = 1;

  constructor(private appointmentService: DashboardAppointmentService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.patientId = history.state.patientId || null;
    console.log("doctorId from state", this.patientId);
    this.route.queryParams.subscribe(params => {
      this.currentPageIndex = +params['Page'] || 1;
      this.loadPatientAppointments();
    });
  }

  loadPatientAppointments() {
    console.log("id",this.patientId);
    this.isLoading = true;
    this.appointmentService.getAllP(5, this.currentPageIndex,this.patientId).subscribe({
      next: (response) => {
        this.patientAppointments = response.data;
        this.isLoading = false;
        console.log("jkj",this.patientAppointments.data);
      },
      error: (err) => {
        console.error('Error fetching specializations:', err);
        this.isLoading = false;
      }
    });
  }
  NextPage(pageIndex: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { Page: pageIndex },
      queryParamsHandling: 'merge'
    });
  }

//   loadPatientAppointments(id: number) {
//     this.appointmentService.GetPatientAppointmentD(id).subscribe(
//       (data) => {
//         this.patientAppointments = data?.data ?? [];
//         console.log('Patients:', this.patientAppointments);
//       },
//       (error) => {
//         console.error('Error fetching patients:', error);
//       }
//     );
//   }
// }
}

