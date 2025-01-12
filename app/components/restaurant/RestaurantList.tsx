'use client';

import { useState } from 'react';
import { Restaurant, HIGHWAYS, Highway } from '../../types/restaurant';
import { StarIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/Button';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onDelete: (id: string) => void;
}

export const RestaurantList = ({ restaurants, onDelete }: RestaurantListProps) => {
  const [selectedHighway, setSelectedHighway] = useState<Highway | 'all'>('all');
  const [selectedDirection, setSelectedDirection] = useState<'상행' | '하행' | 'all'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'latest'>('latest');

  const filteredRestaurants = restaurants
    .filter(restaurant => {
      if (selectedHighway === 'all') return true;
      return restaurant.highway === selectedHighway;
    })
    .filter(restaurant => {
      if (selectedDirection === 'all') return true;
      return restaurant.direction === selectedDirection;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          value={selectedHighway}
          onChange={(e) => setSelectedHighway(e.target.value as Highway | 'all')}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="all">모든 노선</option>
          {HIGHWAYS.map(hw => (
            <option key={hw} value={hw}>{hw}</option>
          ))}
        </select>

        <select
          value={selectedDirection}
          onChange={(e) => setSelectedDirection(e.target.value as '상행' | '하행' | 'all')}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="all">모든 방향</option>
          <option value="상행">상행</option>
          <option value="하행">하행</option>
        </select>

        <Button
          variant={sortBy === 'latest' ? 'primary' : 'secondary'}
          onClick={() => setSortBy('latest')}
        >
          최신순
        </Button>
        <Button
          variant={sortBy === 'rating' ? 'primary' : 'secondary'}
          onClick={() => setSortBy('rating')}
        >
          별점순
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  {restaurant.restArea} - {restaurant.menuName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {restaurant.highway} ({restaurant.direction})
                </p>
              </div>
              <button
                onClick={() => onDelete(restaurant.id)}
                className="text-red-500 hover:text-red-600"
              >
                삭제
              </button>
            </div>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${
                    i < restaurant.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 