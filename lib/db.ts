import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { Restaurant } from '@/app/types/restaurant';
import { v4 as uuid } from 'uuid';

// 컬렉션 레퍼런스
const RESTAURANT_COLLECTION = 'restaurants';

// 맛집 추가
export const addRestaurant = async (data: Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, RESTAURANT_COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef;
  } catch (error) {
    console.error('Error adding restaurant:', error);
    throw error;
  }
};

// 맛집 목록 실시간 조회
export const subscribeToRestaurants = (callback: (restaurants: Restaurant[]) => void) => {
  const q = query(
    collection(db, RESTAURANT_COLLECTION),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const restaurants = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Restaurant[];
    callback(restaurants);
  });
};

// 맛집 정보 수정
export const updateRestaurant = async (
  docId: string, 
  data: Partial<Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>>
) => {
  const restaurantRef = doc(db, RESTAURANT_COLLECTION, docId);
  await updateDoc(restaurantRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

// 맛집 삭제
export const deleteRestaurant = async (docId: string) => {
  await deleteDoc(doc(db, RESTAURANT_COLLECTION, docId));
}; 