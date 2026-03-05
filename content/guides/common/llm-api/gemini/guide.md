---
title: "Google Gemini API Key 발급"
description: "Google Gemini API 키 발급 및 설정 방법"
platform: "common"
category: "LLM 모델 API 키"
subcategory: "LLM API"
order: 2
status: "done"
updatedAt: "2026-03-04"
tags: ["Google", "Gemini", "API키", "LLM"]
---

## 개요

Google Gemini API를 사용하기 위한 키 발급 방법을 안내합니다.

## 1단계: Google AI Studio 접속

[Google AI Studio](https://aistudio.google.com)에 접속하여 구글 계정으로 로그인합니다.

## 2단계: API 키 생성

1. 좌측 메뉴에서 **Get API Key**를 클릭합니다.
2. **Create API key**를 클릭합니다.
3. 기존 Google Cloud 프로젝트를 선택하거나 새로 생성합니다.

## 3단계: 환경변수 설정

```env
GEMINI_API_KEY=발급받은_API_키
```
