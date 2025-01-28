'use client';

import { addRestaurant, subscribeToRestaurants } from '@/lib/db';
import { useState, useEffect } from 'react';
import { StarRating } from '@/components/StarRating';
import { RestaurantList } from '@/components/RestaurantList';
import { Restaurant, Highway, HIGHWAYS } from '@/app/types/restaurant';

export default function Home() {
  const [formData, setFormData] = useState<Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>>({
    highway: HIGHWAYS[0],
    direction: '상행',
    restArea: '',
    menuName: '',
    rating: 5
  });

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToRestaurants((data) => {
      setRestaurants(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await addRestaurant(formData);
      // 폼 초기화
      setFormData({
        highway: HIGHWAYS[0],
        direction: '상행',
        restArea: '',
        menuName: '',
        rating: 5
      });
    } catch (err) {
      setError('데이터 저장 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) as 1 | 2 | 3 | 4 | 5 : value
    }));
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">고속도로 휴게소 맛집</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            고속도로
          </label>
          <select
            name="highway"
            value={formData.highway}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">선택하세요</option>
            <option value="경부고속도로">경부고속도로</option>
            <option value="서해안고속도로">서해안고속도로</option>
            <option value="영동고속도로">영동고속도로</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            방향
          </label>
          <select
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="상행">상행</option>
            <option value="하행">하행</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            휴게소 이름
          </label>
          <input
            type="text"
            name="restArea"
            value={formData.restArea}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            placeholder="예: 안성휴게소"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            메뉴명
          </label>
          <input
            type="text"
            name="menuName"
            value={formData.menuName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            placeholder="예: 안성탕면"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            별점
          </label>
          <StarRating 
            rating={formData.rating}
            onRatingChange={(newRating) => {
              setFormData(prev => ({
                ...prev,
                rating: newRating as 1 | 2 | 3 | 4 | 5
              }));
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          등록하기
        </button>
      </form>

      <div className="grid gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantList key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
