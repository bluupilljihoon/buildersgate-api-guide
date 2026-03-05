---
title: "알리고 API 키 발급"
description: "알리고 문자 발송 API 키 발급 방법"
platform: "common"
category: "기타"
subcategory: "메세징"
order: 3
status: "done"
updatedAt: "2026-03-04"
tags: ["알리고", "문자", "SMS", "API"]
---

## 개요

알리고 문자 발송 서비스의 API 키를 발급받는 방법을 안내합니다.

## 1단계: 알리고 회원가입

[알리고](https://smartsms.aligo.in)에 접속하여 회원가입합니다.

## 2단계: API 키 발급

1. 로그인 후 **문자보내기** > **API 연동**으로 이동합니다.
2. API 키를 확인합니다.

## 3단계: 환경변수 설정

```env
ALIGO_API_KEY=발급받은_API_키
ALIGO_USER_ID=알리고_아이디
ALIGO_SENDER=발신번호
```
