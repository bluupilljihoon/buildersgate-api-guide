---
title: "OpenAI 키 발급"
description: "OpenAI API 키 발급 및 설정 방법"
platform: "common"
category: "LLM 모델 API 키"
subcategory: "LLM API"
order: 1
status: "done"
updatedAt: "2026-03-04"
tags: ["OpenAI", "GPT", "API키", "LLM"]
---

## 개요

OpenAI API를 사용하기 위한 키 발급 방법을 안내합니다.

## 1단계: OpenAI 계정 생성

[OpenAI Platform](https://platform.openai.com)에 접속하여 계정을 생성합니다.

## 2단계: API 키 발급

1. 로그인 후 **API Keys** 메뉴로 이동합니다.
2. **Create new secret key**를 클릭합니다.
3. 키 이름을 입력하고 생성합니다.

> 키는 생성 직후에만 확인 가능하므로 반드시 안전한 곳에 복사해 두세요.

## 3단계: 결제 수단 등록

1. **Settings** > **Billing**으로 이동합니다.
2. 결제 수단(신용카드)을 등록합니다.
3. 사용량 제한을 설정합니다 (권장).

## 4단계: 환경변수 설정

```env
OPENAI_API_KEY=sk-발급받은_API_키
```
