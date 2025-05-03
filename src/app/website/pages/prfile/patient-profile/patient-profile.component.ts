import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../_services/Profile.service';
import { IDoctorProfile } from '../../../../_interfaces/IDoctorProfile';
import { LoaderComponent } from "../../../shared/loader/loader.component";
import { IPatientProfile } from '../../../../_interfaces/IPaatientProfile';

@Component({
  selector: 'app-doctor-profile',
  imports: [LoaderComponent],
templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css',
})
export class PatientProfileComponent implements OnInit {
  constructor(private ProfileService: ProfileService) {}

  doctorProfile!: IPatientProfile;
  newProfileImg:string | null = null ;
  isLoadingPorfile:boolean = true ;
  isImgLoading:boolean = true; 


  ngOnInit(): void {
    this.ProfileService.GetPatientProfile().subscribe((res) => {
      this.doctorProfile = res;
      this.isLoadingPorfile =false ;
      this.isImgLoading = false ;
      console.log(res.data.details);
      
    });
  }

  handleFile(event: any) {
    const formData = new FormData();

    formData.append('File', event.target.files[0]);
    this.isImgLoading = true; 
    this.ProfileService.UpdateProfileImg(formData).subscribe((res) => {
      this.newProfileImg = res.data.profileImg;
      this.isImgLoading = false;
      // console.log(res.data);
    });
  }
}
