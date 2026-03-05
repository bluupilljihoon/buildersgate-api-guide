# 개발자 가이드 웹사이트 개발 프롬프트

## 프로젝트 개요

개발 작업 시 필요한 가이드를 제공하는 Next.js 기반 웹사이트입니다.
로그인 없이 누구나 접근할 수 있는 공개 사이트이며, 가이드 콘텐츠는 텍스트(Markdown)와 이미지를 분리하여 관리합니다.
비개발자도 쉽게 콘텐츠를 수정할 수 있는 구조를 목표로 합니다.

---

## 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | Next.js 14+ (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| Markdown 파싱 | `gray-matter` + `react-markdown` + `rehype-highlight` |
| 이미지 최적화 | Next.js `<Image />` 컴포넌트 |
| 배포 | Vercel (GitHub 연동 자동 배포) |
| 패키지 매니저 | npm |

---

## 레이아웃 및 UI 설계

### 전체 레이아웃 구조

3단 레이아웃을 적용합니다.

```
┌──────────────────────────────────────────────────┐
│  Header: 로고(Gatekeeper) | 검색창               │
├──────────────┬───────────────────────┬────────────┤
│              │                       │            │
│  Left        │  Main Content        │  Right     │
│  Sidebar     │                       │  Sidebar   │
│              │  브레드크럼             │  (목차 TOC) │
│  Tree View   │  제목                  │            │
│  네비게이션   │  설명 태그들            │  헤딩 기반  │
│              │  본문 (Markdown 렌더링) │  목차 링크  │
│  카테고리     │                       │            │
│  └ 소분류    │                       │            │
│    └ 가이드  │                       │            │
│              │                       │            │
└──────────────┴───────────────────────┴────────────┘
```

### Left Sidebar - Tree View 네비게이션

- 최상위: **플랫폼 탭** — `전체` / `웹/앱 공통` / `웹` / `앱` 탭 버튼
- 그 아래: **카테고리 > 소분류 > 가이드** 3단계 트리 구조
- 각 노드는 펼침/접힘(`▶ / ▼`) 토글 가능
- 현재 보고 있는 가이드는 활성화(하이라이트) 표시
- 미완성 가이드는 회색 텍스트 + 비활성 처리
- 펼침/접힘 상태는 localStorage에 저장하여 새로고침 시 유지

### Right Sidebar - 목차 (TOC)

- 현재 가이드의 `## h2`, `### h3` 헤딩을 자동 추출
- 스크롤 위치에 따라 현재 섹션 활성화 표시 (Intersection Observer)

### Header

- 좌측: 로고 (`Gatekeeper`)
- 중앙: 검색창 (가이드 제목 및 설명 검색)

---

## 가이드 카테고리 구조

아래 구조를 `content/guides/` 디렉토리와 사이드바 트리뷰에 그대로 반영합니다.

### 웹/앱 공통

#### 소셜 로그인 API 키
- 네이버 통합 가이드
- 카카오 통합 가이드
- 구글 통합 가이드
- 애플 로그인 _(미완성)_

#### LLM 모델 API 키
- OpenAI 키 발급
- Google Gemini API Key 발급
- Anthropic (Claude) API Key 발급
- Kling AI 키 발급

#### 기타
- **메세징**
  - NAVER SENS (문자 알림/인증)
  - NAVER SENS (이메일 인증)
  - 알리고 API 키 발급
  - SendGrid API 키 발급
- **지도**
  - 카카오 지도 API 키 발급
  - 네이버 지도 _(미완성)_
  - 구글 지도 _(미완성)_
- **센스**
  - 문자용 _(미완성)_
  - 알림톡용 _(미완성)_
- **그 외**
  - Notion API (Integration) 연동
  - Youtube API 키 발급
  - 로젠택배 API 키 발급
  - Resend (메일 발송) 계정 & API _(미완성)_

#### 결제
- 토스페이먼츠 (신청 단계부터 키 발급까지)
- KG 이니시스 _(미완성)_

#### 구글 계정 (완전 기본)

#### 배포 (카드 연결까지)
- GitHub / Supabase / Vercel
- Railway
- AWS
- GCP (구글 클라우드 플랫폼)

---

### 웹

#### 도메인
- 가비아 도메인 구매 및 연결
- 후이즈 _(미완성)_
- 고대디 _(미완성)_

---

### 앱

#### 개발자 계정 (법인 없으면 개인으로)
- 구글 플레이 개발자 계정
- 애플 개발자 계정

#### 던스 번호 (법인 있는 경우)
- DUNS 번호 발급 (영문 사업자 등록증 필요)

#### 앱 출시
- 유료 상품 추가 (구글, 애플) _(미완성)_
- 앱스토어 출시 준비 (구글, 애플) _(미완성)_

---

## 콘텐츠 구조 설계

### 핵심 원칙
- **텍스트와 이미지를 분리**하여 관리합니다.
- 가이드 하나당 동일한 슬러그(slug)를 가진 md 파일과 이미지 폴더가 1:1로 매핑됩니다.
- 텍스트 작성자는 md 파일만, 이미지 작성자는 이미지 폴더만 수정하면 됩니다.

### 디렉토리 구조

```
/content
  /guides
    /common                          ← 웹/앱 공통
      /social-login
        /naver-login
          guide.md
        /kakao-login
          guide.md
        /google-login
          guide.md
      /llm-api
        /openai
          guide.md
        /gemini
          guide.md
        /anthropic
          guide.md
      /payment
        /tosspayments
          guide.md
      /deploy
        /github-supabase-vercel
          guide.md
      ...
    /web                             ← 웹 전용
      /domain
        /gabia
          guide.md
    /app                             ← 앱 전용
      /developer-account
        /google-play
          guide.md
        /apple-developer
          guide.md
      /duns
        /duns-number
          guide.md

/public
  /images
    /guides
      /common
        /social-login
          /naver-login
            step-01.png
            step-02.png
          /kakao-login
            step-01.png
      /web
        /domain
          /gabia
            step-01.png
      /app
        /developer-account
          /google-play
            step-01.png
```

### Markdown 파일 형식 (`guide.md`)

frontmatter로 메타데이터를 관리하고, 본문은 Markdown으로 작성합니다.

```markdown
---
title: "네이버 통합 가이드"
description: "네이버 OAuth를 활용한 소셜 로그인 키 발급 및 연동 방법"
platform: "common"           # common | web | app
category: "소셜 로그인 API 키"
subcategory: "소셜 로그인"
order: 1
status: "done"               # done | draft (draft는 미완성 - 사이드바에 회색 표시)
updatedAt: "2026-03-04"
tags: ["네이버", "OAuth", "소셜로그인"]
---

## 개요

네이버 로그인 API를 사용하여 ...

## 1단계: 애플리케이션 등록

네이버 개발자 센터에 접속하여 ...

![step-01](step-01.png)

## 2단계: 환경변수 설정

...

![step-02](step-02.png)
```

> **이미지 참조 규칙**: md 파일 내 이미지 경로는 파일명만 작성합니다 (`step-01.png`).
> 빌드 시 자동으로 해당 가이드 슬러그 경로로 변환됩니다.

---

## 페이지 구성

### 1. 메인 페이지 (`/`)
- 전체 가이드 목록을 카드 형태로 표시
- 플랫폼 탭(`전체` / `웹/앱 공통` / `웹` / `앱`) 필터링
- 카테고리 필터링

### 2. 가이드 상세 페이지 (`/guides/[...slug]`)
- Markdown 본문 렌더링
- 이미지는 해당 슬러그 경로의 이미지 폴더에서 자동 로드
- 우측 TOC 사이드바 (스크롤 연동)
- 브레드크럼 네비게이션 (홈 / 플랫폼 / 카테고리 / 가이드명)
- 이전/다음 가이드 네비게이션

---

## 핵심 구현 사항

### 이미지 경로 자동 변환
md 파일 내 상대 경로 이미지를 파싱 시 실제 public 경로로 자동 변환하는 커스텀 remark 플러그인을 구현합니다.

```
// 변환 예시
입력:  ![네이버 앱 등록](step-01.png)
출력:  <Image src="/images/guides/common/social-login/naver-login/step-01.png" alt="네이버 앱 등록" />
```

### Tree View 사이드바
- `status: "draft"` 가이드는 회색 텍스트 + 클릭 비활성 처리
- 현재 URL에 해당하는 노드 자동 펼침 및 하이라이트
- 펼침/접힘 상태는 localStorage에 저장하여 새로고침 시 유지

### 정적 생성 (SSG)
- `generateStaticParams()`로 모든 가이드 페이지를 빌드 시 정적 생성
- `getAllGuides()` 유틸리티로 content 디렉토리를 재귀 탐색

### 콘텐츠 로딩 유틸리티 (`/lib/guides.ts`)

| 함수 | 역할 |
|------|------|
| `getAllGuides()` | 전체 가이드 메타데이터 목록 반환 |
| `getGuideBySlug(slug)` | 특정 슬러그의 가이드 내용 반환 |
| `getGuideTree()` | 사이드바 트리뷰 렌더링용 중첩 구조 반환 |
| `getGuidesByPlatform(platform)` | 플랫폼별 가이드 목록 반환 |

---

## UI/UX 요구사항

- **반응형 디자인**: 모바일에서는 좌측 사이드바가 햄버거 메뉴로 전환
- **코드 하이라이팅**: `rehype-highlight` 적용, 다크 테마 코드 블록
- **다크 모드**: Tailwind CSS `dark:` 클래스 활용
- **이미지 클릭 확대**: 이미지 클릭 시 모달로 확대 보기
- **스크롤 TOC 연동**: Intersection Observer로 현재 섹션 TOC 자동 하이라이트
- **브레드크럼**: 상세 페이지 상단에 경로 표시

---

## 프로젝트 디렉토리 전체 구조

```
/
├── app/
│   ├── layout.tsx                    # 루트 레이아웃 (3단 레이아웃)
│   ├── page.tsx                      # 메인 페이지 (가이드 목록)
│   └── guides/
│       └── [...slug]/
│           └── page.tsx              # 가이드 상세 페이지 (동적 라우트)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # 헤더 (로고, 검색창)
│   │   ├── LeftSidebar.tsx           # Tree View 네비게이션
│   │   ├── RightSidebar.tsx          # 목차 (TOC)
│   │   └── Breadcrumb.tsx            # 브레드크럼
│   ├── guide/
│   │   ├── GuideCard.tsx             # 가이드 카드 (목록용)
│   │   ├── GuideContent.tsx          # Markdown 렌더러
│   │   └── ImageModal.tsx            # 이미지 확대 모달
│   └── ui/
│       ├── SearchBar.tsx
│       ├── PlatformTabs.tsx          # 전체/웹앱공통/웹/앱 탭
│       └── TreeNode.tsx              # 트리뷰 단위 노드 컴포넌트
│
├── lib/
│   ├── guides.ts                     # 가이드 콘텐츠 로딩 유틸리티
│   └── remarkImagePath.ts            # 이미지 경로 변환 remark 플러그인
│
├── content/
│   └── guides/
│       ├── common/
│       │   ├── social-login/
│       │   │   └── naver-login/
│       │   │       └── guide.md
│       │   ├── llm-api/
│       │   ├── payment/
│       │   └── deploy/
│       ├── web/
│       │   └── domain/
│       └── app/
│           ├── developer-account/
│           └── duns/
│
├── public/
│   └── images/
│       └── guides/                   # content와 동일한 구조
│           ├── common/
│           ├── web/
│           └── app/
│
├── types/
│   └── guide.ts                      # Guide, GuideTree 타입 정의
│
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 콘텐츠 작성 가이드 (비개발자용)

### 새 가이드 추가 방법

1. `content/guides/{플랫폼}/{카테고리}/{가이드명}/` 폴더를 만듭니다.
   - 플랫폼: `common`, `web`, `app` 중 하나
   - 폴더 이름 규칙: 영문 소문자 + 하이픈 (예: `naver-login`)
2. 해당 폴더 안에 `guide.md` 파일을 만들고 frontmatter 형식에 맞게 작성합니다.
3. `public/images/guides/{플랫폼}/{카테고리}/{가이드명}/` 폴더를 동일하게 만듭니다.
4. 이미지 파일을 해당 폴더에 추가합니다. (예: `step-01.png`, `step-02.png`)
5. md 파일 내에서 이미지를 참조할 때는 파일명만 씁니다: `![설명](step-01.png)`

### 기존 가이드 수정 방법

- **텍스트 수정**: `content/guides/.../guide.md` 파일만 편집
- **이미지 교체**: `public/images/guides/.../` 폴더의 이미지 파일 교체

### 미완성 가이드 처리

- frontmatter에 `status: "draft"` 설정 시 사이드바에 회색 비활성 상태로 표시됩니다.
- 작성이 완료되면 `status: "done"` 으로 변경합니다.

---

## 개발 단계별 순서

### Phase 1. 프로젝트 초기 세팅
1. `npx create-next-app@latest` 실행 (TypeScript, Tailwind, App Router 선택)
2. 필요 패키지 설치
   ```
   npm install gray-matter react-markdown rehype-highlight remark-gfm
   ```
3. 디렉토리 구조 생성 및 샘플 가이드 md 파일 작성

### Phase 2. 콘텐츠 시스템 구축
4. `types/guide.ts` — Guide, GuideTree 타입 정의
5. `lib/guides.ts` — 유틸리티 함수 구현 (재귀 탐색 포함)
6. `lib/remarkImagePath.ts` — 이미지 경로 변환 플러그인 구현

### Phase 3. 레이아웃 구현
7. 루트 레이아웃 (`app/layout.tsx`) — 3단 레이아웃 (좌측 사이드바 / 본문 / 우측 TOC)
8. `Header.tsx` — 로고, 검색창
9. `LeftSidebar.tsx` — Tree View 네비게이션 (플랫폼 탭 + 트리)
10. `TreeNode.tsx` — 펼침/접힘 토글, 활성 상태, draft 비활성 처리

### Phase 4. 페이지 구현
11. 메인 페이지 (`app/page.tsx`) — 카드 목록 + 플랫폼 탭 필터
12. 가이드 상세 페이지 (`app/guides/[...slug]/page.tsx`) — SSG 적용
13. `GuideContent.tsx` — Markdown 렌더러 + 코드 하이라이팅
14. `RightSidebar.tsx` — TOC + Intersection Observer 스크롤 연동
15. `Breadcrumb.tsx` — 경로 자동 생성
16. `ImageModal.tsx` — 이미지 클릭 확대

### Phase 5. 부가 기능
17. 검색 기능 (가이드 제목 + 설명 기준)
18. 다크 모드
19. 반응형 (모바일 햄버거 메뉴)

### Phase 6. 배포
20. GitHub 저장소 생성 및 코드 push
21. Vercel 프로젝트 연결 (GitHub 저장소 import)
    - [vercel.com](https://vercel.com) 접속 → GitHub 계정으로 로그인
    - "Add New Project" → GitHub 저장소 선택
    - Framework: **Next.js** 자동 감지됨
    - "Deploy" 클릭
22. 빌드 테스트 및 최종 확인 (`npm run build`)
23. 커스텀 도메인 연결 (선택 사항, 가비아 등에서 구매한 도메인)

---

## Vercel 배포 흐름

```
로컬 작업
  → GitHub 저장소에 push
    → Vercel이 자동 감지
      → 빌드 실행 (npm run build)
        → 배포 완료 (자동으로 URL 생성)
```

콘텐츠(md 파일, 이미지)를 수정한 후 GitHub에 push하면 자동으로 재배포됩니다.
별도의 서버나 데이터베이스가 없어도 되는 완전한 정적 사이트입니다.

---

## 참고 사항

- 이 문서는 AI 코딩 에이전트에게 전달하기 위한 개발 프롬프트입니다.
- 개발 시작 전 이 문서를 AI에게 제공하고 Phase 1부터 순서대로 진행합니다.
- 각 Phase가 완료될 때마다 `npm run dev`로 동작을 확인합니다.
