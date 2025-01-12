export interface Restaurant {
  id: string;
  highway: string;
  direction: '상행' | '하행';
  restArea: string;
  menuName: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
} 