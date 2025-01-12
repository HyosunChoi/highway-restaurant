'use client';

import { Restaurant } from '@/types/restaurant';
import { RestaurantItem } from './RestaurantItem';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  if (restaurants.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        등록된 맛집이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
} 