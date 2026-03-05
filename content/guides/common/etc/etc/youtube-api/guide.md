---
title: "Youtube API 키 발급"
description: "YouTube Data API 키 발급 방법"
platform: "common"
category: "기타"
subcategory: "그 외"
order: 632
status: "done"
updatedAt: "2026-03-04"
tags: ["YouTube", "API", "Google"]
---

## 개요

YouTube Data API를 사용하기 위한 키 발급 방법을 안내합니다.

## 1단계: Google Cloud Console 접속

[Google Cloud Console](https://console.cloud.google.com)에 접속하여 로그인합니다.

## 2단계: API 활성화

1. **API 및 서비스** > **라이브러리**로 이동합니다.
2. **YouTube Data API v3**를 검색하고 **사용 설정**을 클릭합니다.

## 3단계: API 키 생성

1. **API 및 서비스** > **사용자 인증 정보**로 이동합니다.
2. **사용자 인증 정보 만들기** > **API 키**를 선택합니다.

## 4단계: 환경변수 설정

```env
YOUTUBE_API_KEY=발급받은_API_키
```
