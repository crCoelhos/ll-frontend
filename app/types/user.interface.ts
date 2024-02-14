import { Expertise } from "./expertise.interface";

export type User = {
  id: number;
  CPF: string;
  birthdate: string;
  name: string;
  email: string;
  phoneNumber: string;
  isActive?: boolean | false;
  updatedAt: string | "";
  OAB?: string;
  riteDate?: string;
  secNumber?: string;
  inscriptionType?: string;
  description?: string;
  elaboratedDescription?: string;
  professionalDescription?: string;
  graduateDegree?: string;
  callmeReason?: string;
  image?: string;
  UF?: string;
  userId?: number;
  user?: User;
  expertises?: Expertise[];
};
