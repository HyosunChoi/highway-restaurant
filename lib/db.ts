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
    console.log('저장할 데이터:', data); // 데이터 확인
    const docRef = await addDoc(collection(db, RESTAURANT_COLLECTION), {
      id: uuid(),
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log('문서가 성공적으로 추가됨:', docRef.id);
    return docRef;
  } catch (error) {
    console.error('데이터 저장 중 오류 발생:', error);
    throw error;
  }
};

// 맛집 목록 실시간 조회
export const subscribeToRestaurants = (
  callback: (restaurants: Restaurant[]) => void
) => {
  const q = query(
    collection(db, RESTAURANT_COLLECTION), 
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
    const restaurants = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
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