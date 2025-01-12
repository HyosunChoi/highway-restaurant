'use client';

import { addRestaurant, subscribeToRestaurants } from '@/lib/db';
import { useState, useEffect } from 'react';
import { StarRating } from '@/components/StarRating';
import { RestaurantList } from '@/components/RestaurantList';
import { Restaurant, Highway, HIGHWAYS } from '@/types/restaurant';

export default function Home() {
  const [formData, setFormData] = useState<Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>>({
    highway: HIGHWAYS[0],
    direction: '상행',
    restArea: '',
    menuName: '',
    rating: 5 as const
  });

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    // Firestore 실시간 구독 설정
    const unsubscribe = subscribeToRestaurants((updatedRestaurants) => {
      setRestaurants(updatedRestaurants);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('폼 데이터:', formData);
      const result = await addRestaurant(formData);
      console.log('저장 성공:', result);
      setFormData({
        highway: HIGHWAYS[0],
        direction: '상행',
        restArea: '',
        menuName: '',
        rating: 5 as const
      });
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) as 1 | 2 | 3 | 4 | 5 : value
    }));
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          고속도로 휴게소 맛집
        </h1>
        <p className="text-center mb-8 text-gray-600">
          전국 고속도로 휴게소의 맛있는 메뉴를 공유하세요
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow mb-8">
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
              rating={Number(formData.rating)}
              onRatingChange={(newRating) => {
                setFormData(prev => ({
                  ...prev,
                  rating: newRating
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

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">등록된 맛집</h2>
          <RestaurantList restaurants={restaurants} />
        </div>
      </div>
    </main>
  );
}
