import { vacancy } from "./vacancy";

export type CompaniesTypes = {
  _id: string;
  name: string;
  about: string;
  userId: string;
  vacancies: vacancy[];
};
