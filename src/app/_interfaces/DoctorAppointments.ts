export interface DoctorAppointments {
  firstName: string;
  lastName: string;
  age: number;
  description: string;
  address: string;
  userEmail: string;
  userPhoneNumber: string;
  image: string;
  specialization: string;
  waitingTime: number;
  availableSchedule: {
    day: string;
    isAvailable: boolean;
    slots: any[]; // You can replace `any` with a Slot interface if known
  }[];
}
