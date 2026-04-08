# Web Chat Config Standardization — Scope

## Approach

### Architecture
Refactor `caseyWidgetConfig` from a single `apiUrl` (full chat endpoint) to a base-URL pattern that derives both `chatUrl` and `formUrl`. This eliminates the fragile `.replace()` hack in EstimateForm and fixes the incorrect default server URL. Identical pattern to what a-better already uses and what r-deco/roofsetc are adopting.

Three files change, all minimal edits:
1. `lib/casey/config.ts` — rewrite to base URL pattern (4 lines → 6 lines)
2. `lib/casey/api.ts` — rename `apiUrl` → `chatUrl` (one line, line 52)
3. `app/(site)/free-estimate/EstimateForm.tsx` — use `formUrl` directly (one line, line 32)

### Key patterns
- The env var `NEXT_PUBLIC_CASEY_API_URL` changes meaning from "full chat endpoint" to "base URL" — this is a template, so the env var won't be set until the template is used for a real site, but SETUP.md (if it exists) should reflect the new format
- All future sites spun up from this template will inherit the correct pattern automatically

## Order of Operations

1. **Update `lib/casey/config.ts`** — Change from `apiUrl` to `baseUrl` + `chatUrl`/`formUrl`. Default fallback becomes `https://ai-response-ten.vercel.app`. This is the foundation; both consumers depend on it.
2. **Update `lib/casey/api.ts:52`** — Change `caseyWidgetConfig.apiUrl` → `caseyWidgetConfig.chatUrl`. One-line change.
3. **Update `app/(site)/free-estimate/EstimateForm.tsx:32`** — Replace `caseyWidgetConfig.apiUrl.replace('/casey/chat', '/casey/form')` with `caseyWidgetConfig.formUrl`. One-line change (delete the variable, use config directly — or keep the variable assignment for readability).
4. **Verify build** — `npm run build` must pass. TypeScript will catch any missed `apiUrl` references since the property is removed.

All three code changes ship in a single commit. The codebase is only buildable after all three are applied together (removing `apiUrl` breaks consumers until they're updated).

## Risk Areas

- **No deployment risk** — This is a template, not a live site. There's no Vercel deployment or env var to coordinate. The only risk is the template being in a broken state if partially applied, which the single-commit approach prevents.
- **No other consumers** — Grep confirmed only `api.ts:52` and `EstimateForm.tsx:32` reference `caseyWidgetConfig.apiUrl`. `npm run build` will catch any missed references via TypeScript.

## Dependencies

- **None.** This is a template — no server, no Vercel project, no env vars to update. It just needs to be internally consistent and match the pattern the other sites are adopting.

## Testing Plan

- `npm run build` passes with no TypeScript errors
- Grep for `apiUrl` in `lib/` and `app/` returns zero hits (excluding `.next/` build cache)
- Visual inspection: `config.ts` exports `chatUrl`, `formUrl`, and `apiKey` — matches the target pattern from the master plan

## What We're NOT Doing

- Not updating SETUP.md or other docs — that's a separate `update-docs` step after all sites deploy
- Not touching any other files (analytics, identity, types, etc.) — only the 3 files that reference `apiUrl`

## Questions

None — all resolved in feedback. Straightforward 3-file change matching the established pattern.
