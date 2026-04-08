# Web Chat Config Standardization — Feedback

## What's Wrong or Needs Adjustment

Nothing. The plan accurately describes the current code and the proposed changes are correct.

## Questions for Other Teams

1. **Env var name unchanged?** — The plan keeps `NEXT_PUBLIC_CASEY_API_URL` as the env var name. Confirming this is intentional and the same env var name is used across all sites (roofsetc, r-deco, etc.), just with the semantics changing from "full chat endpoint" to "base server URL". Any site that currently sets this env var to a full endpoint URL (e.g. `https://ai-response-ten.vercel.app/casey/chat`) will need the value updated to just the base (`https://ai-response-ten.vercel.app`).

## Constraints Other Teams Should Know

1. **Template sets the pattern for all future sites** — Whatever lands here becomes the default for every new site spun up from this template. The base URL pattern with `chatUrl`/`formUrl` is the right abstraction since it eliminates the string replacement hack in EstimateForm.tsx.

## What Looks Correct

- `lib/casey/config.ts` current code matches the plan exactly (line 2: wrong default `ai-response.vercel.app`, full endpoint URL as `apiUrl`)
- `lib/casey/api.ts` line 52 uses `caseyWidgetConfig.apiUrl` — renaming to `chatUrl` is straightforward
- `app/(site)/free-estimate/EstimateForm.tsx` line 32 does `caseyWidgetConfig.apiUrl.replace('/casey/chat', '/casey/form')` — replacing with `caseyWidgetConfig.formUrl` eliminates the brittle string manipulation
- `caseyWidgetConfig.apiKey` usage in both `api.ts` (line 42) and `EstimateForm.tsx` (line 39) is untouched by this change
- No other consumers of `caseyWidgetConfig` outside these two files (confirmed via grep)
- The trailing slash strip `.replace(/\/+$/, '')` on the base URL is a good defensive measure

## Status

- [x] Plan reviewed
- [x] Feedback written
- [x] Ready to implement (no blockers)
