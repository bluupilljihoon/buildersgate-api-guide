---
title: "네이버 통합 가이드"
description: "네이버 OAuth를 활용한 소셜 로그인 키 발급 및 연동 방법"
platform: "common"
category: "소셜 로그인 API 키"
subcategory: "소셜 로그인"
order: 1
status: "done"
updatedAt: "2026-03-04"
tags: ["네이버", "OAuth", "소셜로그인"]
---

## 개요

네이버 로그인 API를 사용하여 소셜 로그인을 구현하는 방법을 안내합니다.
네이버 개발자 센터에서 애플리케이션을 등록하고, 클라이언트 ID와 시크릿을 발급받아야 합니다.

## 1단계: 네이버 개발자 센터 접속

[네이버 개발자 센터](https://developers.naver.com)에 접속하여 로그인합니다.

## 2단계: 애플리케이션 등록

1. 상단 메뉴에서 **Application** > **애플리케이션 등록**을 클릭합니다.
2. 애플리케이션 이름을 입력합니다.
3. **사용 API**에서 `네이버 로그인`을 선택합니다.
4. 필요한 정보 제공 항목을 선택합니다 (이름, 이메일 등).

## 3단계: 환경 설정

### 서비스 URL 등록

- **서비스 URL**: `http://localhost:3000` (개발용)
- **Callback URL**: `http://localhost:3000/api/auth/callback/naver`

### 환경변수 설정

발급받은 키를 `.env.local` 파일에 추가합니다:

```env
NAVER_CLIENT_ID=발급받은_클라이언트_ID
NAVER_CLIENT_SECRET=발급받은_클라이언트_시크릿
```

## 4단계: 키 확인

애플리케이션 등록이 완료되면 **내 애플리케이션** 목록에서 클라이언트 ID와 시크릿을 확인할 수 있습니다.
