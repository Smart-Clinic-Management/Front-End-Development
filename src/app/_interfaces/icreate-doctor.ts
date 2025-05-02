export interface ICreateDoctor {
  fname: string;
  lname: string;
  email: string;
  image: File;
  specializationId: number;
  birthDate: string;
  address: string;
  waitingTime: number;
  description: string;
}
