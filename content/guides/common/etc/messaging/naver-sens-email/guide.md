---
title: "NAVER SENS (이메일 인증)"
description: "네이버 클라우드 SENS를 활용한 이메일 인증 설정 방법"
platform: "common"
category: "기타"
subcategory: "메세징"
order: 2
status: "done"
updatedAt: "2026-03-04"
tags: ["네이버", "SENS", "이메일"]
---

## 개요

네이버 클라우드 플랫폼의 SENS를 사용하여 이메일 인증 기능을 구현하는 방법을 안내합니다.

## 1단계: 네이버 클라우드 플랫폼 접속

[네이버 클라우드 플랫폼](https://www.ncloud.com)에 로그인합니다.

## 2단계: Cloud Outbound Mailer 설정

1. **Services** > **Cloud Outbound Mailer**를 선택합니다.
2. 이용 신청을 완료합니다.

## 3단계: 발신 이메일 등록

1. **발신자 관리**에서 발신 이메일 주소를 등록합니다.
2. 이메일 인증을 완료합니다.

## 4단계: 환경변수 설정

```env
NCLOUD_ACCESS_KEY=발급받은_Access_Key
NCLOUD_SECRET_KEY=발급받은_Secret_Key
```
