import { IAppointment } from "./IAppointment";

export interface IPatientAppointmentNew {
  data: IAppointment[];
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  total: number;
}
