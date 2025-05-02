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
import { DoctordetailsComponent } from './website/pages/doctor/doctordetails/doctordetails.component';
import { PatientAppointmentsComponent } from './website/pages/Patient/patient-appointments/patient-appointments.component';
import { PatientGuard } from './_guards/patient.guard';
import { DoctorAppointmentsComponent } from './website/pages/doctor/doctor-appointments/doctor-appointments.component';
import { DoctorGuard } from './_guards/doctor.guard';
import { AddSpecializationComponent } from './dashboard/pages/specialization/add-specialization/add-specialization.component';
import { EditSpecializationComponent } from './dashboard/pages/specialization/edit-specialization/edit-specialization.component';
import { AllAppointmentsComponent } from './dashboard/pages/appointments/all-appointments/all-appointments.component';
import { DoctorScheduleComponent } from './dashboard/pages/schedule/doctor-schedule/doctor-schedule.component';

export const routes: Routes = [
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [
      { path: '', component: WebsiteHomeComponent },
      { path: 'doctors', component: DoctorListComponent },
      { path: 'doctor/:id', component: DoctordetailsComponent },
      { path: 'specializaions', component: SpecializaionListComponent },
      {
        path: 'doctorProfile',
        component: DoctorProfileComponent,
        canActivate: [DoctorGuard],
      },
      {
        path: 'patientProfile',
        component: PatientProfileComponent,
        canActivate: [PatientGuard],
      },
      {
        path: 'patientAppointments',
        component: PatientAppointmentsComponent,
        canActivate: [PatientGuard],
      },
      {
        path: 'doctor-appointments',
        component: DoctorAppointmentsComponent,
        canActivate: [DoctorGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'doctors', component: AllDoctorsComponent },
      { path: 'doctors/add', component: AddDoctorComponent },
      { path: 'doctors/edit/:id', component: EditDoctorComponent },
      { path: 'doctors/details/:id', component: DoctorDetailsComponent },
      { path: 'doctors/schedule/:id', component: DoctorScheduleComponent },
      { path: 'specializations', component: AllSpecializaionsComponent },
      {
        path: 'specializations/details/:id',
        component: SpecializaionDetailsComponent,
      },
      { path: 'patients', component: AllPatientsComponent },
      { path: 'specializations/add', component: AddSpecializationComponent },
      { path: 'specializations/edit/:id', component: EditSpecializationComponent },
      { path: 'specializations/details/:id', component: SpecializaionDetailsComponent },
      { path: 'patients', component: AllPatientsComponent }
    ],
      { path: 'patients', component: AllPatientsComponent },
      { path: 'appointments', component: AllAppointmentsComponent }
    ]
  },
  { path: '**', component: NotfoundComponent },
];
