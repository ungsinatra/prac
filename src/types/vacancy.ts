export type vacancy = {
  _id: string | null;
  title: string;
  price: number;
  about: string;
  company: string;
  aboutCompany: string;
  occupied: string;
  logo: string;
  experience: string;
  location: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  date: string;
  graid: string;
  direction: string;
  testId: string;
  repliesUsers: RepliesType[];
};

type RepliesType = {
  _id: string;
};
