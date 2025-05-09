export interface IUpdateAppointmentRequest {
  appointmentId: number;
  status: 'Pending' | 'Canceled' | 'Completed';
}
