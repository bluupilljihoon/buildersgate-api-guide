---
title: "카카오 지도 API 키 발급"
description: "카카오 지도 API 키 발급 및 설정 방법"
platform: "common"
category: "기타"
subcategory: "지도"
order: 1
status: "done"
updatedAt: "2026-03-04"
tags: ["카카오", "지도", "API"]
---

## 개요

카카오 지도 API를 사용하기 위한 키 발급 방법을 안내합니다.

## 1단계: 카카오 개발자 사이트 접속

[카카오 개발자 사이트](https://developers.kakao.com)에 접속하여 로그인합니다.

## 2단계: 애플리케이션 등록

1. **내 애플리케이션** > **애플리케이션 추가하기**를 클릭합니다.
2. 앱 이름과 사업자명을 입력합니다.

## 3단계: JavaScript 키 확인

1. 생성된 앱의 **앱 키** 탭에서 JavaScript 키를 복사합니다.

## 4단계: 플랫폼 등록

1. **플랫폼** 탭에서 Web 플랫폼을 추가합니다.
2. 사이트 도메인을 등록합니다.

## 5단계: 환경변수 설정

```env
NEXT_PUBLIC_KAKAO_MAP_KEY=발급받은_JavaScript_키
```
