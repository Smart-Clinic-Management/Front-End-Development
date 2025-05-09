import { IDoctorAppointmentNew } from "./IDocAppNew";

export interface IDoctorPagination {
  data: IDoctorAppointmentNew[];
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  total: number;
}
