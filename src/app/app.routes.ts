import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard/layout/dashboard-layout/dashboard-layout.component';
import { DashboardHomeComponent } from './dashboard/pages/dashboard-home/dashboard-home.component';
import { WebsiteHomeComponent } from './website/pages/website-home/website-home.component';
import { WebsiteLayoutComponent } from './website/layout/website-layout/website-layout.component';
import { AllDoctorsComponent } from './dashboard/pages/doctor/all-doctors/all-doctors.component';
import { AddDoctorComponent } from './dashboard/pages/doctor/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './dashboard/pages/doctor/edit-doctor/edit-doctor.component';
import { DoctorDetailsComponent } from './dashboard/pages/doctor/doctor-details/doctor-details.component';
import { DoctorListComponent } from './website/pages/doctor/doctor-list/doctor-list.component';


export const routes: Routes = [
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      { path: '', component: WebsiteHomeComponent },
      { path: 'doctors', component: DoctorListComponent },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'doctors', component: AllDoctorsComponent },
      { path: 'doctors/add', component: AddDoctorComponent },
      { path: 'doctors/edit', component: EditDoctorComponent },
      { path: 'doctors/details', component: DoctorDetailsComponent },
    ]
  }
];
