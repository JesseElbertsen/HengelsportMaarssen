export type Product = {
  id: number;
  title: string;
  description: string;
  info: string;
  amount: number;
  image?: string | null;
  price: number;
  oldPrice?: number | null;
  type: string;
  public_id?: string | null;
};

export type Reservation = {
  id: string;
  product?: { title?: string; type?: string; price?: number; amount?: number };
  productId?: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type OpeningHours = {
  maandag: string;
  dinsdag: string;
  woensdag: string;
  donderdag: string;
  vrijdag: string;
  zaterdag: string;
  zondag: string;
};

export interface BusinessInfo {
  adres: string;
  postcode: string;
  locatie: string;
  telefoon: string;
  email: string;
  kvk: string;
  btw: string;
  openingHours: OpeningHours;
}
