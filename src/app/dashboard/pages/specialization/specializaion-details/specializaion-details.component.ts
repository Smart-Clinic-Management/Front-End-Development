import { Component } from '@angular/core';
import { SpecializationService } from '../../../../_services/specialization.service';
import { ActivatedRoute } from '@angular/router';
import { ISpecialization } from '../../../../_interfaces/ispecialization';

@Component({
  selector: 'app-specializaion-details',
  imports: [],
  templateUrl: './specializaion-details.component.html',
  styleUrl: './specializaion-details.component.css'
})
export class SpecializaionDetailsComponent {
  specializationId: number | null = null;
  specializationDetails: ISpecialization | null = null;
  constructor(private specializationService: SpecializationService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.specializationId = +idParam;
        this.loadSpecializationDetails(this.specializationId);
      }
    });
  }

  loadSpecializationDetails(id: number) {
    if (id) {
      this.specializationService.getSpecializationDetails(id).subscribe(
        (data) => {
          this.specializationDetails = data?.data ?? null;
          console.log('Specialization:', this.specializationDetails);
        },
        (error) => {
          console.error('Error fetching doctor details:', error);
        }
      );
    }
  }
}
