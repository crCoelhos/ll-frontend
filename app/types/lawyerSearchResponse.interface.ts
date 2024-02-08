import { Expertise } from "./expertise.interface";

export type lawyerSearchResponse = {
  userId: number;
  lawyerId: number;
  name: string;
  email: string;
  phoneNumber: string;
  CPF: string;
  birthdate: string;
  OAB: string;
  riteDate: string;
  inscriptionType: string;
  graduateDegree: string;
  description: string;
  elaboratedDescription: string;
  professionalDescription: string;
  callmeReason: string;
  image: string;
  UF: string;
  expertises: Expertise[];
};
