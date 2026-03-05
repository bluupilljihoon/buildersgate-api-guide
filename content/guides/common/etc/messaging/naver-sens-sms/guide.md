---
title: "NAVER SENS (문자 알림/인증)"
description: "네이버 클라우드 SENS를 활용한 문자 발송 API 설정 방법"
platform: "common"
category: "기타"
subcategory: "메세징"
order: 611
status: "done"
updatedAt: "2026-03-04"
tags: ["네이버", "SENS", "문자", "SMS"]
---

## 개요

네이버 클라우드 플랫폼의 SENS(Simple & Easy Notification Service)를 사용하여 문자 발송 기능을 구현하는 방법을 안내합니다.

## 1단계: 네이버 클라우드 플랫폼 가입

[네이버 클라우드 플랫폼](https://www.ncloud.com)에 접속하여 회원가입합니다.

## 2단계: SENS 프로젝트 생성

1. 콘솔에서 **Services** > **SENS**를 선택합니다.
2. **프로젝트 생성**을 클릭합니다.
3. 프로젝트 이름을 입력합니다.

## 3단계: 발신번호 등록

1. **SMS** > **발신번호 관리**에서 발신번호를 등록합니다.
2. 본인인증을 완료합니다.

## 4단계: API 인증키 확인

1. **마이페이지** > **API 인증키 관리**에서 Access Key와 Secret Key를 확인합니다.

## 5단계: 환경변수 설정

```env
NCLOUD_ACCESS_KEY=발급받은_Access_Key
NCLOUD_SECRET_KEY=발급받은_Secret_Key
SENS_SERVICE_ID=SENS_서비스_ID
```
