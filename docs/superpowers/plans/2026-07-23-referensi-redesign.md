# Redesign Data Referensi (Mahasiswa & Admin) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign both student (`ReferensiClient.tsx`) and admin (`ReferensiManager.tsx`) reference data pages with a modern card/grid catalog, top stats summary, category tabs, and enhanced file upload & management tools.

**Architecture:** Upgrade UI layout of existing Client Components to leverage modern grid layouts, Tailwind CSS design tokens, icons, and reusable `<Button>` / `<Input>` / `<FileUploader>` components while preserving existing backend hooks (`useReferenceFiles`, `useCreateReferenceFile`, `useDeleteReferenceFile`).

**Tech Stack:** React, Next.js 16, Tailwind CSS, Lucide React / SVG Icons, TypeScript.

## Global Constraints
- Follow Antigravity web app design guidelines (rich aesthetics, sleek dark/brand accents, micro-animations, clear typography).
- Preserve existing React Query hooks and API contracts in `useReferenceFiles`.
- Always use `@/components/Button` for button elements.
- TypeScript strictly checked (`npx tsc --noEmit`).

---

### Task 1: Redesign Mahasiswa Referensi View (`src/components/dashboard/ReferensiClient.tsx`)

**Files:**
- Modify: `src/components/dashboard/ReferensiClient.tsx`

**Interfaces:**
- Consumes: `useReferenceFiles` hook, `@/components/Button`, `@/components/Input`, `ReferenceFile` type.
- Produces: Redesigned Mahasiswa reference page component with stats, category tabs, grid view, and modern cards.

- [ ] **Step 1: Update `ReferensiClient.tsx` component implementation**

Update `src/components/dashboard/ReferensiClient.tsx` to include:
1. Top summary cards (Total Referensi, Panduan & Templat, Buku & Jurnal).
2. Category filter tabs (`Semua`, `Panduan`, `Jurnal`, `Buku`, `Templat`, `Contoh`).
3. 3-Column Grid Layout with modern reference cards.
4. Rich badge color styles for categories and file types.
5. Consistent `<Button>` components for "Lihat" and "Unduh" actions.

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors.

---

### Task 2: Redesign Admin Referensi Manager View (`src/components/dashboard/admin/ReferensiManager.tsx`)

**Files:**
- Modify: `src/components/dashboard/admin/ReferensiManager.tsx`

**Interfaces:**
- Consumes: `useReferenceFiles`, `useCreateReferenceFile`, `useDeleteReferenceFile`, `@/components/Button`, `@/components/Input`, `@/components/FileUploader`.
- Produces: Redesigned Admin reference management page with stats overview, clean split-panel upload form, and document cards with deletion workflow.

- [ ] **Step 1: Update `ReferensiManager.tsx` component implementation**

Update `src/components/dashboard/admin/ReferensiManager.tsx` to include:
1. Admin Stats overview banner at top.
2. Left side: Modern Upload Card with styled category selection (`Panduan`, `Jurnal`, `Buku`, `Templat`, `Contoh`), title input, description, and drag-and-drop uploader.
3. Right side: Reference cards with file badges, meta details, download link, and danger-style delete buttons using `<Button>`.

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: 0 errors.
