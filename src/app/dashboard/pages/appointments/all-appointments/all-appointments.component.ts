import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DashboardAppointmentService } from '../../../../_services/dashboard-appointment.service';
import { PaginationResponse } from '../../../../_interfaces/response/PaginationResponse';

@Component({
  selector: 'app-all-appointments',
  imports: [CommonModule,RouterLink],
  templateUrl: './all-appointments.component.html',
  styleUrl: './all-appointments.component.css'
})
export class AllAppointmentsComponent {
  doctorId: number | null = null;
  doctorAppointments!: PaginationResponse<any>;
  router = inject(Router);
  isLoading = true;
  currentPageIndex = 1;

  constructor(private appointmentService: DashboardAppointmentService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPageIndex = +params['Page'] || 1;
      this.loadDoctorAppointments();
    });
  }
  loadDoctorAppointments() {
    this.isLoading = true;
    this.appointmentService.getAlll(5, this.currentPageIndex).subscribe({
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