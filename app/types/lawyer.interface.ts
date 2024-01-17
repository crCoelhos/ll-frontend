import { User } from "./user.interface";
import { Expertise } from "./expertise.interface";

export type Lawyer = {
  id: number;
  OAB: string;
  riteDate: string;
  secNumber: string;
  inscriptionType: string;
  description: string;
  graduateDegree: string;
  image: string;
  UF: string;
  userId: number;
  user: User;
  expertises: Expertise[];
};
