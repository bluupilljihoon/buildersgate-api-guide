---
title: "카카오 통합 가이드"
description: "카카오 OAuth를 활용한 소셜 로그인 키 발급 및 연동 방법"
platform: "common"
category: "소셜 로그인 API 키"
subcategory: "소셜 로그인"
order: 402
status: "done"
updatedAt: "2026-03-04"
tags: ["카카오", "OAuth", "소셜로그인"]
---

## 개요

카카오 로그인 API를 사용하여 소셜 로그인을 구현하는 방법을 안내합니다.

## 1단계: 카카오 개발자 사이트 접속

[카카오 개발자 사이트](https://developers.kakao.com)에 접속하여 로그인합니다.

## 2단계: 애플리케이션 추가

1. **내 애플리케이션** > **애플리케이션 추가하기**를 클릭합니다.
2. 앱 이름과 사업자명을 입력합니다.

## 3단계: 플랫폼 등록

1. **앱 설정** > **플랫폼**에서 Web 플랫폼을 추가합니다.
2. 사이트 도메인: `http://localhost:3000`

## 4단계: 카카오 로그인 활성화

1. **제품 설정** > **카카오 로그인**에서 활성화를 ON으로 설정합니다.
2. Redirect URI: `http://localhost:3000/api/auth/callback/kakao`

## 5단계: 환경변수 설정

```env
KAKAO_CLIENT_ID=발급받은_REST_API_키
KAKAO_CLIENT_SECRET=발급받은_클라이언트_시크릿
```
