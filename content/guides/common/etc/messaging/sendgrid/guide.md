---
title: "SendGrid API 키 발급"
description: "SendGrid 이메일 발송 API 키 발급 방법"
platform: "common"
category: "기타"
subcategory: "메세징"
order: 4
status: "done"
updatedAt: "2026-03-04"
tags: ["SendGrid", "이메일", "API"]
---

## 개요

SendGrid 이메일 발송 서비스의 API 키를 발급받는 방법을 안내합니다.

## 1단계: SendGrid 계정 생성

[SendGrid](https://sendgrid.com)에 접속하여 계정을 생성합니다.

## 2단계: API 키 발급

1. 로그인 후 **Settings** > **API Keys**로 이동합니다.
2. **Create API Key**를 클릭합니다.
3. 키 이름을 입력하고 권한을 설정합니다.

## 3단계: 발신자 인증

1. **Settings** > **Sender Authentication**으로 이동합니다.
2. 발신 이메일 또는 도메인을 인증합니다.

## 4단계: 환경변수 설정

```env
SENDGRID_API_KEY=SG.발급받은_API_키
```
