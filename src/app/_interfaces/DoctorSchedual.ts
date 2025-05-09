export interface DoctorSchedual {
  firstName: string;
  lastName: string;
  age: number;
  description: string;
  address: string;
  email: string;
  phoneNumber: string;
  image: string;
  specialization: string;
  specializationId: string;
  waitingTime: number;
  availableSchedule: {
    day: string;
    isAvailable: boolean;
    slots: {
      time: string;
      isAvailable: boolean;
    }[]; // You can replace `any` with a Slot interface if known
  }[];
}
