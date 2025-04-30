import { Component,Input } from '@angular/core';
import { IDoctorListItem } from '../../../../_interfaces/idoctor-list-item';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
  @Input() doctor!: IDoctorListItem;
}
