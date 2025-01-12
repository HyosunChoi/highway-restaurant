'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { Restaurant } from '@/types/restaurant';

interface RestaurantItemProps {
  restaurant: Restaurant;
}

export function RestaurantItem({ restaurant }: RestaurantItemProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{restaurant.menuName}</h3>
          <p className="text-sm text-gray-600">
            {restaurant.highway} {restaurant.direction}
          </p>
          <p className="text-sm text-gray-500">{restaurant.restArea}</p>
        </div>
        <div className="flex gap-0.5">
          {[...Array(restaurant.rating)].map((_, i) => (
            <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  );
} 