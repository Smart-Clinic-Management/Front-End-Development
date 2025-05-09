import { Component, inject } from '@angular/core';
import { ISpecialization } from '../../../../_interfaces/ispecialization';
import { SpecializationService } from '../../../../_services/specialization.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AllSpecializations } from '../../../../_interfaces/response/Specialization/AllSpecializations';
import { PaginationResponse } from '../../../../_interfaces/response/PaginationResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specializaion-list',
  imports: [RouterLink , CommonModule],
  templateUrl: './specializaion-list.component.html',
  styleUrl: './specializaion-list.component.css'
})
export class SpecializaionListComponent {
  specializations!: PaginationResponse<AllSpecializations>;
  specializationService = inject(SpecializationService);


  currentPageIndex = 1 ;
  isLoading = true ;

  constructor(private ActivatedRoute:ActivatedRoute , private Route:Router) { }

  ngOnInit(): void {

    this.ActivatedRoute.queryParams.subscribe( params => {
      this.currentPageIndex = params['Page'] || 1 ;
      this.loadSpecializations();

    } )
  }



  loadSpecializations() {
    this.isLoading = true;
    this.specializationService.getAllSpecializationsPaginated(6,this.currentPageIndex).subscribe(
      (data) => {
        this.specializations = data.data;
        setTimeout(() => {
          this.isLoading = false; 
          
        }, 1000);
      },
      (error) => {
        console.error('Error fetching Specializations:', error);
      }
    );
  }

  NextPage(pageIndex:number){
    
    this.Route.navigate([],{
      relativeTo : this.ActivatedRoute ,
      queryParams:{
        Page: pageIndex
      }, 
      queryParamsHandling:'merge'
    })


  }
}
