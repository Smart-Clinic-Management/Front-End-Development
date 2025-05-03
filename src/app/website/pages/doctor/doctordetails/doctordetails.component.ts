import { Component, inject } from '@angular/core';
import { DoctorService } from '../../../../_services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorSchedual } from '../../../../_interfaces/DoctorSchedual';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../../shared/loader/loader.component";

@Component({
  selector: 'app-doctordetails',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './doctordetails.component.html',
  styleUrls: ['./doctordetails.component.css' ]
})
export class DoctordetailsComponent {

  doctorService = inject(DoctorService);

  doctorAppintment!:DoctorSchedual  ;
  isLoading:boolean = true ;

  tabCurrentActiveDay:string = "" ;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.doctorService.GetDoctorWithAppointments(params['id']).subscribe( res => {
        this.doctorAppintment =  res.data ;
        this.tabCurrentActiveDay = this.doctorAppintment.availableSchedule[0].day ;
        // console.log(this.doctorAppintment.availableSchedule[0].day);
        this.isLoading =false ;
        
      } ) ;
      // this.doctorId = +; // + converts string to number
    });
  }

}
