---
title: "Anthropic (Claude) API Key 발급"
description: "Anthropic Claude API 키 발급 및 설정 방법"
platform: "common"
category: "LLM 모델 API 키"
subcategory: "LLM API"
order: 503
status: "done"
updatedAt: "2026-03-04"
tags: ["Anthropic", "Claude", "API키", "LLM"]
---

## 개요

Anthropic Claude API를 사용하기 위한 키 발급 방법을 안내합니다.

## 1단계: Anthropic 계정 생성

[Anthropic Console](https://console.anthropic.com)에 접속하여 계정을 생성합니다.

## 2단계: API 키 발급

1. 로그인 후 **API Keys** 메뉴로 이동합니다.
2. **Create Key**를 클릭합니다.
3. 키 이름을 입력하고 생성합니다.

## 3단계: 결제 수단 등록

1. **Settings** > **Plans & Billing**으로 이동합니다.
2. 결제 수단을 등록합니다.

## 4단계: 환경변수 설정

```env
ANTHROPIC_API_KEY=sk-ant-발급받은_API_키
```
