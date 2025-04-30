import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ISpecialization } from '../../../../_interfaces/ispecialization';
import { SpecializationService } from '../../../../_services/specialization.service';

@Component({
  selector: 'app-all-specializaions',
  imports: [RouterModule],
  templateUrl: './all-specializaions.component.html',
  styleUrl: './all-specializaions.component.css'
})
export class AllSpecializaionsComponent {
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
