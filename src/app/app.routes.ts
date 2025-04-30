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
import { AllSpecializaionsComponent } from './dashboard/pages/specialization/all-specializaions/all-specializaions.component';
import { SpecializaionDetailsComponent } from './dashboard/pages/specialization/specializaion-details/specializaion-details.component';
import { SpecializaionListComponent } from './website/pages/specialization/specializaion-list/specializaion-list.component';
import { DoctorProfileComponent } from './website/pages/prfile/doctor-profile/doctor-profile.component';
import { PatientProfileComponent } from './website/pages/prfile/patient-profile/patient-profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotfoundComponent } from './website/pages/notfound/notfound.component';
import { AllPatientsComponent } from './dashboard/pages/patient/all-patients/all-patients.component';


export const routes: Routes = [
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      { path: '', component: WebsiteHomeComponent },
      { path: 'doctors', component: DoctorListComponent },
      { path: 'specializaions', component: SpecializaionListComponent },
      { path: 'doctorProfile', component: DoctorProfileComponent },
      { path: 'patientProfile', component: PatientProfileComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component:  RegisterComponent},
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'doctors', component: AllDoctorsComponent },
      { path: 'doctors/add', component: AddDoctorComponent },
      { path: 'doctors/edit', component: EditDoctorComponent },
      { path: 'doctors/details/:id', component: DoctorDetailsComponent },
      { path: 'specializations', component: AllSpecializaionsComponent },
      { path: 'specializations/details/:id', component: SpecializaionDetailsComponent },
      { path: 'patients', component: AllPatientsComponent }
    ]
  },
  { path: '**', component: NotfoundComponent }
];
