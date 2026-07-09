# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SIBITA (Sistem Bimbingan Tugas Akhir) — a Next.js 16 / React 19 frontend for a thesis-supervision platform at UIN Mataram. It is a **frontend-only** app that talks to a separate backend over HTTP; there are no API routes here. UI copy and domain vocabulary are in Indonesian (mahasiswa=student, dosen=lecturer, bimbingan=supervision, tahap=stage).

## Commands

```bash
npm run dev          # dev server (http://localhost:3000)
npm run dev:https    # dev server over https using ./certificates/*.pem (needed for some auth flows)
npm run build        # production build
npm run start        # serve production build
npm run lint         # eslint (next core-web-vitals + typescript + @tanstack/query rules)
```

There is no test runner configured. `node tailwind-canonical-fixer.js [--dry-run]` normalizes Tailwind class ordering.

## Backend contract

The backend base URL comes from `NEXT_PUBLIC_API_URL` (see `.env`, defaults to `http://localhost:3000`). `src/lib/api-url.ts` resolves it, swapping in the page's own protocol when the URL is localhost to avoid mixed-content over https. The full REST + auth contract this frontend depends on is documented in `docs/API.md`, and the backend data model in `docs/DATABASE.md` — consult these when adding or changing a service call.

## Architecture

Data flows through three layers, kept strictly separated:

1. **Services** (`src/services/*.ts`) — one object per domain (`studentService`, `lecturerService`, `referenceService`, `authService`). Every backend call goes through `apiFetch` from `src/lib/api-client.ts`, which prefixes the base URL, sends the better-auth session cookie (`credentials: "include"`), parses JSON, and throws `ApiError` (carrying HTTP `status`) on non-2xx. TypeScript interfaces for request/response shapes live alongside the service. `authService` is the exception — it wraps the better-auth client rather than `apiFetch`.

2. **Hooks** (`src/hooks/*.ts`) — TanStack Query wrappers around services (`useStudent.ts`, `useLecturer.ts`, `useReferenceFiles.ts`). Query keys are centralized in exported `*Keys` factory objects (e.g. `bimbinganKeys.detail(stageId)`) so invalidation stays typo-proof; mutations invalidate the relevant key `onSuccess`. The `QueryClient` (in `src/components/providers/QueryProvider.tsx`) is tuned to **not retry 4xx** (they won't succeed) and to retry 5xx up to twice.

3. **Components** (`src/components/**`) — consume hooks, never call services or `fetch` directly.

### Auth & routing

- Auth is **better-auth** via `src/lib/auth-client.ts` (email/password, email-OTP verification, Google social). `authService` wraps it.
- **Role-based routing lives in `src/__proxy.ts`** — this is Next.js middleware logic (session check + role→dashboard redirects + per-path role guards) but the file is named `__proxy.ts`, so it is **currently inactive**. To enable route protection, it must be wired up as `middleware.ts` (with `proxy`→`middleware` and `proxyConfig`→`config` exports). Roles are `student | lecturer | admin | superadmin`, mapping to `/dashboard/{mahasiswa,dosen,admin,superadmin}`.
- App Router routes under `src/app/dashboard/<role>/` each have their own `layout.tsx` and sidebar. Only the **mahasiswa** layout wraps children in `ProgressProvider`; dosen/admin/superadmin layouts are plain Server Components.

### Stage domain model

The thesis workflow is **17 fixed stages**, defined statically in `src/lib/stages.ts` (`STAGES` array: slug, lucide icon, and typed form `fields`; `FALLBACK_STAGE_DETAILS` holds names/descriptions/durations used when the backend hasn't supplied them). `getStageMetadata(n, backendStage)` merges backend data over the fallback. `src/lib/stage-status.ts` holds **pure** functions for timeline windows and per-stage status (`belum-mulai | berlangsung | selesai`) derived from the set of completed stages. `ProgressProvider` merges static `STAGES` with backend progress into `MergedStage[]` and exposes it via `useProgress()`.

### Cross-cutting UI

- `ToastProvider` / `useToast()` — app-wide toasts; call `toast.success(...)`, `toast.error(title, { description })`.
- Path alias `@/*` → `src/*`.
- Styling is **Tailwind v4** (CSS-first). Design tokens are declared in `@theme` inside `src/app/globals.css` (e.g. `--color-brand`), not a JS config file. Fonts (Plus Jakarta Sans display, Inter body) are wired via CSS variables in the root layout.

## Conventions

- `admin-data.ts` and `superadmin-data.ts` in `src/lib/` are **hardcoded dummy data** — those dashboards are not yet backed by the API. New backend-connected features should follow the service→hook→component pattern instead.
- Reusable skills for the libraries in use (better-auth, Next.js, TanStack) are vendored under `.agents/skills/` and pinned in `skills-lock.json`.
