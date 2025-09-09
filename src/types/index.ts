// API Types
export interface ApiReview {
  _id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface ApiReservation {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

// Form Types
export interface ReviewForm {
  author: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ReservationForm {
  customerName: string;
  email: string;
  phone: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pages: number;
  currentPage: number;
}