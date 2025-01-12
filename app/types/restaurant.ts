export interface Restaurant {
  id: string;
  highway: string;
  direction: '상행' | '하행';
  restArea: string;
  menuName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
  updatedAt: Date;
}

export const HIGHWAYS = [
  '경부고속도로',
  '서해안고속도로',
  '영동고속도로',
  '중부고속도로',
  '호남고속도로',
  '88올림픽고속도로',
  '중부내륙고속도로',
  '남해고속도로',
  '동해고속도로',
  '경인고속도로'
] as const;

export type Highway = (typeof HIGHWAYS)[number]; 