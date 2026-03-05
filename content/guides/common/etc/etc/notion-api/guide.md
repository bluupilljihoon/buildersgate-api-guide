---
title: "Notion API (Integration) 연동"
description: "Notion API Integration 생성 및 연동 방법"
platform: "common"
category: "기타"
subcategory: "그 외"
order: 1
status: "done"
updatedAt: "2026-03-04"
tags: ["Notion", "API", "Integration"]
---

## 개요

Notion API를 사용하기 위한 Integration 생성 및 연동 방법을 안내합니다.

## 1단계: Notion Integration 생성

[Notion Developers](https://developers.notion.com)에 접속하여 로그인합니다.

## 2단계: New Integration 생성

1. **My Integrations**에서 **New Integration**을 클릭합니다.
2. Integration 이름을 입력합니다.
3. 연결할 워크스페이스를 선택합니다.

## 3단계: API 토큰 복사

1. Integration 생성 후 **Internal Integration Token**을 복사합니다.

## 4단계: 페이지/데이터베이스 연결

1. Notion에서 연결할 페이지를 엽니다.
2. 우측 상단 **...** > **연결** > 생성한 Integration을 선택합니다.

## 5단계: 환경변수 설정

```env
NOTION_API_KEY=secret_발급받은_토큰
NOTION_DATABASE_ID=데이터베이스_ID
```
