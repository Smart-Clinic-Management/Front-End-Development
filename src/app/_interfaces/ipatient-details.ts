export interface IpatientDetails {
  firstName: string;
  lastName: string;
  userEmail: string;
  userPhoneNumber: string;
  age: number;
  address: string;
  image: File | string | null;
  medicalHistory: string | null;
}
