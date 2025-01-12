import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAxmOfbRFY0gkTt6bNK3-vcKMMGQa5lsYM",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "goodtaste-942e2.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "goodtaste-942e2",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "goodtaste-942e2.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "799750378926",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:799750378926:web:22e92fe4280247262ae43f"
};

console.log('Firebase 설정:', firebaseConfig); // 설정 확인

const app = initializeApp(firebaseConfig);
console.log('Firebase 초기화 성공');

export const db = getFirestore(app); 