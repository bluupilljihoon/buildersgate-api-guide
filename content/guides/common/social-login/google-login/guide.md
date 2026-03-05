---
title: "구글 통합 가이드"
description: "구글 OAuth를 활용한 소셜 로그인 키 발급 및 연동 방법"
platform: "common"
category: "소셜 로그인 API 키"
subcategory: "소셜 로그인"
order: 3
status: "done"
updatedAt: "2026-03-04"
tags: ["구글", "OAuth", "소셜로그인", "Google"]
---

## 개요

구글 OAuth 2.0을 사용하여 소셜 로그인을 구현하는 방법을 안내합니다.

## 1단계: Google Cloud Console 접속

[Google Cloud Console](https://console.cloud.google.com)에 접속하여 로그인합니다.

## 2단계: 프로젝트 생성

1. 상단의 프로젝트 선택 드롭다운을 클릭합니다.
2. **새 프로젝트**를 클릭하고 프로젝트 이름을 입력합니다.

## 3단계: OAuth 동의 화면 설정

1. **API 및 서비스** > **OAuth 동의 화면**으로 이동합니다.
2. User Type: **외부**를 선택합니다.
3. 앱 이름, 사용자 지원 이메일 등을 입력합니다.

## 4단계: OAuth 클라이언트 ID 생성

1. **API 및 서비스** > **사용자 인증 정보**로 이동합니다.
2. **사용자 인증 정보 만들기** > **OAuth 클라이언트 ID**를 선택합니다.
3. 애플리케이션 유형: **웹 애플리케이션**
4. 승인된 리디렉션 URI: `http://localhost:3000/api/auth/callback/google`

## 5단계: 환경변수 설정

```env
GOOGLE_CLIENT_ID=발급받은_클라이언트_ID
GOOGLE_CLIENT_SECRET=발급받은_클라이언트_시크릿
```
