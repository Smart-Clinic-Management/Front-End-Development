import { Component, inject } from '@angular/core';
import { ISpecialization } from '../../../../_interfaces/ispecialization';
import { SpecializationService } from '../../../../_services/specialization.service';

@Component({
  selector: 'app-specializaion-list',
  imports: [],
  templateUrl: './specializaion-list.component.html',
  styleUrl: './specializaion-list.component.css'
})
export class SpecializaionListComponent {
  specializations: ISpecialization[] = [];
  specializationService = inject(SpecializationService);

  constructor() { }

  ngOnInit(): void {
    this.loadSpecializations();
  }

  loadSpecializations() {
    this.specializationService.getAllSpecialization().subscribe(
      (data) => {
        this.specializations = data?.data ?? [];
        console.log('Specializations:', this.specializations);
      },
      (error) => {
        console.error('Error fetching Specializations:', error);
      }
    );
  }
}
