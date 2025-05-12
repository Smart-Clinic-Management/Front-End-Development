import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DashboardAppointmentService } from '../../../../_services/dashboard-appointment.service';
import { PaginationResponse } from '../../../../_interfaces/response/PaginationResponse';

@Component({
  selector: 'app-dashboard-doctor-appointment',
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard-doctor-appointment.component.html',
  styleUrl: './dashboard-doctor-appointment.component.css'
})
export class DashboardDoctorAppointmentComponent {
  doctorId: number | null = null;
  doctorAppointments!: PaginationResponse<any>;
  router = inject(Router);
  isLoading = true;
  currentPageIndex = 1;

  constructor(private appointmentService: DashboardAppointmentService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.doctorId = history.state.doctorId || null;
    console.log("doctorId from state", this.doctorId);
    this.route.queryParams.subscribe(params => {
      this.currentPageIndex = +params['Page'] || 1;
      this.loadDoctorAppointments();
    });
  }
  loadDoctorAppointments() {
    console.log("id",this.doctorId);
    this.isLoading = true;
    this.appointmentService.getAll(5, this.currentPageIndex,this.doctorId).subscribe({
      next: (response) => {
        this.doctorAppointments = response.data;
        this.isLoading = false;
        console.log("jkj",this.doctorAppointments.data);
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
}
