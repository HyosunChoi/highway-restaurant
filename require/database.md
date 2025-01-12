### 데이터베이스 구조

Firestore 컬렉션 구조:
typescript
todos (collection)
├── todoId (document, auto-generated)
│ ├── id: string // UUID
│ ├── title: string // 할 일 제목
│ ├── completed: boolean // 완료 여부
│ ├── priority: number // 우선순위 (1: 높음, 2: 중간, 3: 낮음)
│ ├── createdAt: timestamp // 생성 시간
│ └── updatedAt: timestamp // 수정 시간

### 사용방법

1. Firebase 초기화:
typescript
// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
// Firebase 콘솔에서 가져온 설정
apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


2. CRUD 작업:
typescript
// 할 일 추가
import { collection, addDoc } from 'firebase/firestore';
const addTodo = async (title: string, priority: number) => {
await addDoc(collection(db, 'todos'), {
id: uuid(),
title,
completed: false,
priority,
createdAt: serverTimestamp(),
updatedAt: serverTimestamp()
});
};
// 할 일 조회
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
const getTodos = () => {
const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
return onSnapshot(q, (snapshot) => {
// 실시간 데이터 업데이트 처리
});
};
// 할 일 수정
import { doc, updateDoc } from 'firebase/firestore';
const updateTodo = async (docId: string, data: Partial<Todo>) => {
const todoRef = doc(db, 'todos', docId);
await updateDoc(todoRef, {
...data,
updatedAt: serverTimestamp()
});
};
// 할 일 삭제
import { doc, deleteDoc } from 'firebase/firestore';
const deleteTodo = async (docId: string) => {
await deleteDoc(doc(db, 'todos', docId));
};


### 룰

Firestore 보안 규칙:
javascript
rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
// todos 컬렉션 규칙
match /todos/{todoId} {
// 읽기: 모든 사용자 허용
allow read: if true;
// 생성: 필수 필드 검증
allow create: if
request.resource.data.keys().hasAll(['id', 'title', 'completed', 'priority', 'createdAt', 'updatedAt']) &&
request.resource.data.title is string &&
request.resource.data.title.size() > 0 &&
request.resource.data.completed is bool &&
request.resource.data.priority is number &&
request.resource.data.priority >= 1 &&
request.resource.data.priority <= 3;
// 수정: 존재하는 문서만 수정 가능
allow update: if
resource.data.id == request.resource.data.id &&
request.resource.data.diff(resource.data).affectedKeys()
.hasAny(['title', 'completed', 'priority', 'updatedAt']);
// 삭제: 모든 사용자 허용
allow delete: if true;
}
}
}



이 규칙들은:
1. 데이터 무결성 보장
2. 필수 필드 검증
3. 데이터 타입 검증
4. 수정 가능한 필드 제한
5. 안전한 CRUD 작업 보장

을 목적으로 합니다.

이 설계는:
간단하고 효율적인 데이터 구조
실시간 동기화 지원
타입 안정성
보안 규칙을 통한 데이터 보호
확장 가능한 구조
를 제공합니다.
