import { Component, OnInit, inject } from '@angular/core';
import { DoctorComponent } from '../doctor/doctor.component';
import { DoctorService } from '../../../../_services/doctor.service';
import { IDoctorListItem } from '../../../../_interfaces/idoctor-list-item';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { PaginationResponse } from '../../../../_interfaces/response/PaginationResponse';
import { AllDoctorsPagination } from '../../../../_interfaces/response/Doctor/AllDoctorsPagination';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpecializationService } from '../../../../_services/specialization.service';
import { AllSpecializations } from '../../../../_interfaces/response/Specialization/AllSpecializations';

@Component({
  selector: 'app-doctor-list',
  imports: [DoctorComponent, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css',
})
export class DoctorListComponent implements OnInit {
  doctorService = inject(DoctorService);
  SpecializationService = inject(SpecializationService);

  doctors!: PaginationResponse<AllDoctorsPagination>;
  Specializations!:AllSpecializations[] ;
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
      let doctorName = `doctorName=${params['doctorName'] ?? ''}`;
      let orderBy = `OrderBy=${params['OrderBy'] ?? ''}`;
      let IsDescending = `IsDescending=${params['IsDescending'] ?? ''}`;
      let Specialization = `Specialization=${params['Specialization'] ?? ''}`;


      this.param = this.param.concat(pageIndex);
      this.param = this.param.concat('&', doctorName);
      this.param = params['OrderAge'] !='' ? this.param.concat('&', orderBy) : this.param;
      this.param = params['Specialization'] !='' ? this.param.concat('&', Specialization) : this.param;
      this.param =
        params['IsDescending'] ? this.param.concat('&', IsDescending) : this.param;

        this.currentIndex = Number(pageIndex) ;
        

      this.loadDoctors();
    });

    this.LoadSpecialization() ;

  }

  LoadSpecialization(){
    console.log(0);
    
    this.SpecializationService.getAllSpecializations(20).subscribe( res=> {
      
      this.Specializations = res.data.data ;
      
    } )

  }

  loadDoctors() {
    this.doctorService.getAllDoctors(this.param).subscribe(
      (data) => {
        this.doctors = data.data;
        console.log('Doctors:', this.doctors);
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching doctors:', error);
        this.isLoading = false;
      }
    );
  }

  goToPage(page: number) {
    // Set query string on page change
    console.log(page);

    this.router.navigate([], {
      relativeTo: this.ActivatedRoute,
      queryParams: {
        pageIndex: page,
      },
      queryParamsHandling: 'merge',
    });
  }
  ///////////////////
  ///////////////////
  doctorName = new FormControl('', Validators.required);

  SearchDoctorName() {
    if (!this.doctorName.value) {
      this.doctorName.markAsTouched();
      this.doctorName.setErrors({
        required: 'doctor name is required',
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.ActivatedRoute,
        queryParams: {
          doctorName: this.doctorName.value,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  orderBtn(order: 0 | 1) {
    if (order == 0) {
      this.router.navigate([], {
        relativeTo: this.ActivatedRoute,
        queryParams: {
          OrderBy: 'age',
          IsDescending: true,
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.ActivatedRoute,
        queryParams: {
          OrderBy: 'age',
          IsDescending: false,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  SpecSelection(e:any){
    this.router.navigate([], {
      relativeTo: this.ActivatedRoute,
      queryParams: {
        Specialization: e.target.value
      },
      queryParamsHandling: 'merge',
    });
    
  }

  clearFilters(){ 
    this.doctorName.setValue(" ") ;
    this.router.navigate([], {
      relativeTo: this.ActivatedRoute,
      queryParams: {},
    });
  }
}
