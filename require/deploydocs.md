# 1. 모든 변경사항을 GitHub에 커밋
git add .
git commit -m "Deploy preparation"
git push origin main

# 2. 프로젝트 빌드 테스트
npm run build

2. 환경 변수 준비
다음 환경 변수들을 메모해두세요:
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAxmOfbRFY0gkTt6bNK3-vcKMMGQa5lsYM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=goodtaste-942e2.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=goodtaste-942e2
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=goodtaste-942e2.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=799750378926
NEXT_PUBLIC_FIREBASE_APP_ID=1:799750378926:web:22e92fe4280247262ae43f

3. Vercel 배포 단계

1.Vercel 계정 설정
-Vercel 접속
-GitHub 계정으로 로그인/회원가입

2.프로젝트 import
-"New Project" 클릭
-"Import Git Repository" 선택
-해당 GitHub 저장소 선택

3.프로젝트 설정
-Project Name: 원하는 이름 입력
-Framework Preset: Next.js 자동 선택 확인
-Root Directory: ./ (기본값 사용)

4.환경 변수 설정
-"Environment Variables" 섹션 확장
-위의 모든 Firebase 환경 변수들을 추가
-각 변수의 이름과 값을 정확히 입력

5.배포 설정
-Build Command: next build
-Output Directory: .next
-Install Command: npm install

6."Deploy" 클릭


4. 배포 후 확인사항
1.도메인 확인
배포 완료 후 제공되는 도메인 확인 (예: your-project.vercel.app)
필요시 커스텀 도메인 설정 가능
2.Firebase 설정
Firebase Console에서 배포된 도메인 추가
   // Firebase Console에서:
   Authentication > Settings > Authorized domains
   // 여기에 vercel 도메인 추가

3.환경 변수 확인
   // 배포된 사이트에서 Firebase 연결 확인
   console.log('Firebase Config:', {
     projectId: firebaseConfig.projectId
   });

5. 자동 배포 설정
# GitHub에 push할 때마다 자동 배포
git add .
git commit -m "Update something"
git push origin main

6. 문제 해결
만약 배포 후 문제가 발생한다면:
빌드 로그 확인
Vercel 대시보드 > Deployments > Latest Deployment > Build Logs
환경 변수 확인
Vercel 대시보드 > Settings > Environment Variables
3. 재배포
   # Vercel CLI를 통한 수동 재배포
   npm i -g vercel
   vercel



   echo "# highway-restaurant" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/HyosunChoi/highway-restaurant.git
git push -u origin main