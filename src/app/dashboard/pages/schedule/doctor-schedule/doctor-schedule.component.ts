import { Component } from '@angular/core';
import { DoctorService } from '../../../../_services/doctor.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-schedule',
  imports: [RouterLink],
  templateUrl: './doctor-schedule.component.html',
  styleUrl: './doctor-schedule.component.css'
})
export class DoctorScheduleComponent {
  doctorId: number | null = null;
  doctorSchedule: any[] = [];
  constructor(private doctorService: DoctorService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.doctorId = +idParam;
        this.loadDoctorSchedule(this.doctorId);
      }
    });
  }
  loadDoctorSchedule(id: number) {
    this.doctorService.GetDoctorSchedule(id).subscribe(
      (data) => {
        this.doctorSchedule = data?.data ?? [];
        console.log("try");
        console.log('Schedule:', this.doctorSchedule);
      },
      (error) => {
        console.error('Error fetching doctor schedule:', error);
      }
    );
  }
}
