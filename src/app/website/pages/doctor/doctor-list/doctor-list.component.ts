import { Component } from '@angular/core';
import { DoctorComponent } from "../doctor/doctor.component";

@Component({
  selector: 'app-doctor-list',
  imports: [DoctorComponent],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent {

}
