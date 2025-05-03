import { Component, inject } from '@angular/core';
import { DoctorService } from '../../../../_services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorSchedual } from '../../../../_interfaces/DoctorSchedual';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { IAppointmentRequest } from '../../../../_interfaces/IAppointmentsRequest';
import { AppointmentService } from '../../../../_services/Appointment.service';

interface SelectedAppointment {
  day: string;
  time: string;
  date: string;
}

@Component({
  selector: 'app-doctordetails',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './doctordetails.component.html',
  styleUrls: ['./doctordetails.component.css'],
})
export class DoctordetailsComponent {
  doctorService = inject(DoctorService);
  AppointmentService = inject(AppointmentService);

  doctorAppintment!: DoctorSchedual;
  isLoading: boolean = true;

  tabCurrentActiveDay: string = '';

  showLightBox: boolean = false;

  selected!: SelectedAppointment;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.doctorService
        .GetDoctorWithAppointments(params['id'])
        .subscribe((res) => {
          this.doctorAppintment = res.data;
          this.tabCurrentActiveDay =
            this.doctorAppintment.availableSchedule[0].day;
          // console.log(this.doctorAppintment.availableSchedule[0].day);
          this.isLoading = false;

          console.log(this.doctorAppintment.availableSchedule);
          
        });
      // this.doctorId = +; // + converts string to number
    });
  }

  private GetDate(day: string): Date {
    const dayNameToIndex: { [key: string]: number } = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const current = new Date();
    const currentIndex = current.getDay();
    const targetIndex = dayNameToIndex[day.toLowerCase()];

    let daysToAdd = (targetIndex - currentIndex + 7) % 7;

    const next = new Date(current);
    next.setDate(current.getDate() + daysToAdd);

    return next;
  }

  handleAppointment(temp: any, time: any) {
    this.selected = {
      day: temp,
      date: this.GetDate(temp).toLocaleDateString('en-CA'),
      time: time,
    };
  }

  ConfirmAppointment(specId: string) {
    this.route.params.subscribe((res) => {
      let confirm: IAppointmentRequest = {
        specializationId: Number(specId),
        doctorId: Number(res['id']),
        appointmentDate: this.selected.date,
        startTime: this.selected.time,
      };

      this.AppointmentService.CreateAppointment(confirm).subscribe((res) => {
        console.log(res);
      });
    });
  }
}
