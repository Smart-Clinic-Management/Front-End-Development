export interface ISpecializationDoctor{
  id: number;
  description: string | null;
  waitingTime: number;
  userId: string;
  isActive: boolean;
  user: any;
  doctorSchedules: any[];
  appointments: any[];
  specializations: (string | null)[];
}
export interface ISpecialization {
  id?: number;
  name: string;
  description: string;
  image: File | string | null;
  isActive?: boolean;
  doctors?: ISpecializationDoctor[];
  appointments?: any[];
}
