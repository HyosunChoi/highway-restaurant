### Project Overview (프로젝트 개요):
이 프로젝트는 고속도로 휴게소의 맛집 정보를 공유하고 관리하는 웹 애플리케이션으로, Firebase를 활용해 데이터를 저장하고 관리합니다.

### Core Functionalities (핵심 기능):
✅ 완료된 기능:
- 데이터베이스 설계
- Firebase 연동 설계
- 보안 규칙 설정
- 기본 UI 컴포넌트 구현
- 반응형 레이아웃 구현
- 다크모드 지원

🚀 진행 예정 기능:
- Firebase 연동 및 실시간 데이터 동기화
- 고속도로 휴게소 맛집 정보 입력
  - 고속도로 노선 선택 (셀렉트 박스)
  - 방향 선택 (상행/하행)
  - 휴게소 이름 입력
  - 메뉴명 입력
  - 별점 평가 (5점 만점)
- 맛집 정보 필터링 및 정렬
  - 노선별 필터링
  - 방향별 필터링
  - 별점 기준 정렬

### 데이터 구조:
restaurants (collection)
├── id: string
├── highway: string // 고속도로 노선
├── direction: '상행' | '하행'
├── restArea: string // 휴게소 이름
├── menuName: string // 메뉴명
├── rating: number // 별점 (1-5)
├── createdAt: timestamp
└── updatedAt: timestamp

### UI/UX 개선사항:
1. 디자인 시스템
   - Color Scheme: 
     - Primary: #3B82F6 (블루)
     - Secondary: #10B981 (그린)
     - Accent: #8B5CF6 (퍼플)
     - Background: #FFFFFF/#1F2937 (라이트/다크)
   
2. 사용성 개선
   - 별점 입력을 위한 직관적인 UI
   - 고속도로 노선 쉬운 선택
   - 자주 가는 휴게소 빠른 선택
   
3. 반응형 디자인
   - Mobile: < 640px
   - Tablet: 640px - 1024px
   - Desktop: > 1024px

### Tech Stack (기술 스택):
- Frontend: React, TailwindCSS, TypeScript
- Backend: Firebase/Firestore
- Packages:
  - firebase
  - react-icons
  - uuid
  - framer-motion (애니메이션)
  - @heroicons/react (아이콘)

### File Structure (파일 구조):