import { Expertise } from "./expertise.interface";

export type User = {
  id: number;
  CPF: string;
  birthdate: string;
  name: string;
  email: string;
  phoneNumber: string;
  isActive: boolean;
  updatedAt: string | "";

  OAB?: string;
  riteDate?: string;
  secNumber?: string;
  inscriptionType?: string;
  description?: string;
  elaboratedDescription?: string;
  professionalDescription?: string;
  graduateDegree?: string;
  image?: string;
  UF?: string;
  userId?: number;
  user?: User;
  expertises?: Expertise[];
};
