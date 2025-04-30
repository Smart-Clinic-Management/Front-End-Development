export interface IDoctor {
  id?: number;
  firstName: string;
  lastName: string;
  image?: string | File | null;
  specializations: string[];
  userEmail: string;
  address: string;
  birthDate: number;
  description: string;
  waitingTime: number;
  userPhoneNumber: string;
}
