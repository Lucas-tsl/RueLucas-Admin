// Types pour les réservations de l'API
export interface ApiReservation {
  _id: string;
  code: string;
  status: 'pending' | 'paid' | 'cancelled';
  email: string;
  phoneNumber: string;
  firstName: string;
  surname: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  amountTotal: number;
  createdAt: string;
  updatedAt: string;
}

// Types pour les réservations dans les formulaires
export interface ReservationForm {
  customerName: string;
  customerEmail: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'paid' | 'cancelled';
}

// Types pour les avis de l'API
export interface ApiReview {
  _id: string;
  customerName: string;
  hotelName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Types pour les avis dans les formulaires
export interface ReviewForm {
  customerName: string;
  hotelName: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Types pour les réponses API
export interface ApiResponse<T> {
  items: T[];
  total: number;
  pages: number;
  currentPage: number;
}
