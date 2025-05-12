import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ISpecialization } from '../../../../_interfaces/ispecialization';
import { SpecializationService } from '../../../../_services/specialization.service';
import { AllSpecializations } from '../../../../_interfaces/response/Specialization/AllSpecializations';
import { PaginationResponse } from '../../../../_interfaces/response/PaginationResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-specializaions',
  imports: [RouterModule,CommonModule],
  templateUrl: './all-specializaions.component.html',
  styleUrl: './all-specializaions.component.css'
})
export class AllSpecializaionsComponent {
  successMsg: string = '';
  errorMsg: string = '';
  specializationService = inject(SpecializationService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  specializations!: PaginationResponse<AllSpecializations>;
  isLoading = true;
  currentPageIndex = 1;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPageIndex = +params['Page'] || 1;
      this.loadSpecializations();
    });
  }

  loadSpecializations() {
    this.isLoading = true;
    this.specializationService.getAllSpecializationsPaginated(5, this.currentPageIndex).subscribe({
      next: (response) => {
        this.specializations = response.data;
        this.isLoading = false;
        console.log(this.specializations.data);
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

  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this specialization?')) {
      this.specializationService.deleteSpecialization(id).subscribe({
        next: (res:any) => {
          if (res.statusCode === 1) {
            this.successMsg = 'Deleted successfully';
            this.errorMsg = '';
          } else {
            this.errorMsg = res.message || 'An error occurred.';
            this.successMsg = '';
          }
          this.loadSpecializations();
        },
        error: (err) => {
          this.errorMsg = err?.error?.message || 'An error occurred while deleting.';
          this.successMsg = '';
          console.error('Error deleting specialization:', err);
        }
      });
    }
  }
}
