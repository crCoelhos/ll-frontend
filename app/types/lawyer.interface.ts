import { User } from "./user.interface";
import { Expertise } from "./expertise.interface";

export type Lawyer = {
  id: number;
  OAB: string;
  riteDate: string;
  secNumber: string;
  inscriptionType: string;
  description: string;
  elaboratedDescription: string;
  professionalDescription: string;
  callmeReason: string;
  graduateDegree: string;
  image: string;
  UF: string;
  userId: number;
  user: User;
  expertises: Expertise[];
};
