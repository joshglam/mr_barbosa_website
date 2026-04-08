# Web Chat Config Standardization — Website Template Plan

## Overview

The template needs the same config standardization as the live sites so all future sites start with the correct pattern. Two issues: (1) the default Casey API URL points to the wrong server (`ai-response.vercel.app` — correct is `ai-response-ten.vercel.app`), and (2) the config stores the full chat endpoint URL (`/casey/chat`) instead of a base URL, forcing the form to derive its URL via fragile string replacement.

## Your Changes

### 1. `lib/casey/config.ts` — Rewrite to base URL pattern

**Current:**
```typescript
export const caseyWidgetConfig = {
  apiUrl: process.env.NEXT_PUBLIC_CASEY_API_URL ?? 'https://ai-response.vercel.app/casey/chat',
  apiKey: process.env.NEXT_PUBLIC_CASEY_API_KEY ?? undefined,
};
```

**Change to:**
```typescript
const baseUrl = (process.env.NEXT_PUBLIC_CASEY_API_URL ?? 'https://ai-response-ten.vercel.app').replace(/\/+$/, '');

export const caseyWidgetConfig = {
  chatUrl: `${baseUrl}/casey/chat`,
  formUrl: `${baseUrl}/casey/form`,
  apiKey: process.env.NEXT_PUBLIC_CASEY_API_KEY ?? undefined,
};
```

### 2. `lib/casey/api.ts` — Line 52

**Current:**
```typescript
const response = await fetch(caseyWidgetConfig.apiUrl, {
```

**Change to:**
```typescript
const response = await fetch(caseyWidgetConfig.chatUrl, {
```

### 3. `app/(site)/free-estimate/EstimateForm.tsx` — Line 32

**Current:**
```typescript
const formUrl = caseyWidgetConfig.apiUrl.replace('/casey/chat', '/casey/form');
```

**Change to:**
```typescript
const formUrl = caseyWidgetConfig.formUrl;
```

## What the Server Expects

- Chat: `POST {baseUrl}/casey/chat` with `Authorization: Bearer <api_key>`
- Form: `POST {baseUrl}/casey/form` with `Authorization: Bearer <api_key>`
- When spinning up a new site from this template, set `NEXT_PUBLIC_CASEY_API_URL` to the base server URL (no path) and `NEXT_PUBLIC_CASEY_API_KEY` to the business's Casey API key

## Review Instructions

After reviewing this plan:
1. Check that `caseyWidgetConfig.apiUrl` is not referenced anywhere else (grep for it)
2. Write feedback to `website-template/Web-Chat-Config-feedback.md`

## Status
- [x] Plan reviewed
- [x] Feedback written
- [x] Scope written
- [x] Ready to implement
