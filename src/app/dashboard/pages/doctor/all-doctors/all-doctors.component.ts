import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule,ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../../../_services/doctor.service';
import { IDoctorListItem } from '../../../../_interfaces/idoctor-list-item';
import { PaginationResponse } from '../../../../_interfaces/response/PaginationResponse';
import { AllDoctorsPagination } from '../../../../_interfaces/response/Doctor/AllDoctorsPagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-doctors',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './all-doctors.component.html',
  styleUrl: './all-doctors.component.css'
})
export class AllDoctorsComponent implements OnInit{
  doctorService = inject(DoctorService);
  successMsg: string = '';
  errorMsg: string = '';
  doctors!: PaginationResponse<AllDoctorsPagination>;
  isLoading: boolean = true;
  currentIndex= 1;

  param = '?';
  constructor(private ActivatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.ActivatedRoute.queryParams.subscribe((params) => {
      this.isLoading = true;
      this.param = '';
      let pageIndex = `pageIndex=${params['pageIndex'] || 1}`;
      this.param = this.param.concat(pageIndex);
      this.currentIndex = Number(pageIndex) ;


      this.loadDoctors();
    });
  }
  loadDoctors() {
    this.doctorService.getAllDoctors(this.param).subscribe(
      (data) => {
        this.doctors = data.data;
        console.log('Doctors:', this.doctors.data);
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

  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: (res:any) => {
          if (res.statusCode === 1) {
            this.successMsg = 'Deleted successfully';
            this.errorMsg = '';
          } else {
            this.errorMsg = res.message || 'An error occurred.';
            this.successMsg = '';
          }
          this.loadDoctors();
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'An error occurred while deleting.';
          this.successMsg = '';
          console.error('Error deleting Doctor:', err);
        }
      });
    }
  }
}