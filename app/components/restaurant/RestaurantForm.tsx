'use client';

import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { StarIcon } from '@heroicons/react/24/solid';
import { HIGHWAYS, Highway } from '../../types/restaurant';

interface RestaurantFormProps {
  onAdd: (data: {
    highway: Highway;
    direction: '상행' | '하행';
    restArea: string;
    menuName: string;
    rating: 1 | 2 | 3 | 4 | 5;
  }) => void;
}

export const RestaurantForm = ({ onAdd }: RestaurantFormProps) => {
  const [highway, setHighway] = useState<Highway>(HIGHWAYS[0]);
  const [direction, setDirection] = useState<'상행' | '하행'>('상행');
  const [restArea, setRestArea] = useState('');
  const [menuName, setMenuName] = useState('');
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restArea.trim() || !menuName.trim()) return;
    
    onAdd({
      highway,
      direction,
      restArea: restArea.trim(),
      menuName: menuName.trim(),
      rating
    });
    
    setRestArea('');
    setMenuName('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={highway}
          onChange={(e) => setHighway(e.target.value as Highway)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {HIGHWAYS.map(hw => (
            <option key={hw} value={hw}>{hw}</option>
          ))}
        </select>
        
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as '상행' | '하행')}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="상행">상행</option>
          <option value="하행">하행</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="휴게소 이름"
          value={restArea}
          onChange={(e) => setRestArea(e.target.value)}
        />
        <Input
          placeholder="메뉴명"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star as 1 | 2 | 3 | 4 | 5)}
            className="focus:outline-none"
          >
            <StarIcon
              className={`w-8 h-8 ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      <Button type="submit" className="w-full">
        맛집 추가
      </Button>
    </form>
  );
}; 