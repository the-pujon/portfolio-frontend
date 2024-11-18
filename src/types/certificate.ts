export interface Certificate {
  _id: string;
  title: string;
  issuedBy: string;
  date: string;
  image: string;
  credentialLink?: string;
  category: string;
  description: string;
  skills: string[];
}
