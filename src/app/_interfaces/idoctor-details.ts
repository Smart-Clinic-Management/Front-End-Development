export interface IDoctorDetails {
  firstName: string;
  lastName: string;
  userEmail: string;
  userPhoneNumber: string;
  birthDate: string;
  address: string;
  description: string;
  waitingTime: number;
  image: string | null;
  slotDuration: number | null;
}
