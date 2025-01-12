'use client';

import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-yellow-400 w-8 h-8 focus:outline-none transition-transform hover:scale-110"
        >
          {star <= (hover || rating) ? (
            <StarSolid className="w-full h-full" />
          ) : (
            <StarOutline className="w-full h-full" />
          )}
        </button>
      ))}
      {rating === 0 && (
        <span className="text-sm text-gray-500 ml-2 self-center">
          별점을 선택해주세요
        </span>
      )}
    </div>
  );
} 