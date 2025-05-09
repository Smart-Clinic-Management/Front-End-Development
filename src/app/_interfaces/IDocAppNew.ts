export interface IDoctorAppointmentNew {
  id: number;
  patientId: number;
  patientFullName: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
}
