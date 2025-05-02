export interface ISpecializationDoctor{
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}
export interface ISpecialization {
  id?: number;
  name: string;
  description: string;
  image: File | string | null;
  doctors?: ISpecializationDoctor[];
}
