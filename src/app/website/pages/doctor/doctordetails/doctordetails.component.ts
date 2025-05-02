import { Component, inject } from '@angular/core';
import { DoctorService } from '../../../../_services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorAppointments } from '../../../../_interfaces/DoctorAppointments';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctordetails',
  imports: [CommonModule],
  templateUrl: './doctordetails.component.html',
  styleUrls: ['./doctordetails.component.css' ]
})
export class DoctordetailsComponent {

  doctorService = inject(DoctorService);

  doctorAppintment!:DoctorAppointments  ;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.doctorService.GetDoctorWithAppointments(params['id']).subscribe( res => {
        this.doctorAppintment =  res.data ; console.log(res);
      } ) ;
      // this.doctorId = +; // + converts string to number
    });
  }

}
