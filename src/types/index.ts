export interface IEvent {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  date: string;
  rating?: number;
  reviews?: number;
  location?: string;
  status?: 'pending' | 'approved';
  createdAt?: string;
}