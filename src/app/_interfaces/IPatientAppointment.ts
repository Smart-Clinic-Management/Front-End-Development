export interface IPatientAppointment {
  data: [{
    appointmentId: number;
    appointmentDate: string;
    doctorId: number;
    doctorFullName: string;
    startTime: string;
    endTime: string;
    status: string;
  }];
}
