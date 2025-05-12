export interface ISchedule {
  scheduleId: number;
  dayNumber: number;
  day: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export interface IDoctorDetails {
  firstName: string;
  lastName: string;
  userEmail: string;
  phoneNumber: string | null;
  age: number;
  birthdate: string;
  address: string;
  description: string | null;
  waitingTime: number;
  image: string | null;
  specializationId: number;
  specialization: string;
  schedule?: ISchedule[];
  slotDuration: number | null;
}