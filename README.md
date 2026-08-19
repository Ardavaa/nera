# 🚀 NERA Monorepo (wondr by BNI Financial Safety Module)

> **Tagline:** *Predict Risk. Borrow Smart. Live Free.*  
> Platform kecerdasan finansial berbasis AI yang terintegrasi secara *native/embedded* di dalam aplikasi **wondr by BNI** untuk melindungi generasi muda dari jebakan pinjaman berisiko, mengunci tabungan simpanan (CASA), dan meningkatkan transaksi harian BNI.

---

## 🏛️ Monorepo Architecture

Struktur monorepo ini dirancang secara modular menggunakan **Turborepo** dan **pnpm/npm workspaces**:

```
bni-ventures/
├── .agents-context/               # Spesifikasi produk & state machine logic
│   ├── PROJECT_CONTEXT.md
│   └── STATE_MACHINE.md
│
├── apps/
│   ├── web/                       # Next.js 14+ PWA (Nera Mobile Web in wondr frame)
│   │   ├── src/app/
│   │   │   ├── page.tsx           # Flow B: Beranda + Runway Hero Card + Smart Nudges
│   │   │   ├── family-hub/        # Flow A: Onboarding, Pairing Ortu-Anak & Smart Splitter
│   │   │   ├── risk-check/        # Flow C: AI Risk Intelligence & 24h Guardrail
│   │   │   ├── recovery/          # Flow D: AI Recovery Consultant & Debt Snowball
│   │   │   ├── wealth-engine/     # Flow E: 3-Tier Staged Wealth Ladder
│   │   │   └── coach/             # NerAI Interactive Chat Consultant
│   │   ├── src/context/           # Zustand Store (FinancialStore.ts)
│   │   └── src/components/common/ # TopAppBar, BottomNav, MobileFrame
│   │
│   └── api/                       # Express / Node API Gateway & AI Microservice
│       └── src/
│           ├── routes/            # /api/risk, /api/simulation, /api/coach, /api/bni
│           └── server.ts          # API Server
│
├── packages/
│   ├── core/                      # Domain logic, state machine & financial formulas
│   │   ├── src/state-machine/     # Risk scoring engine (0-100: AMAN, WASPADA, KRITIS)
│   │   ├── src/formulas/          # DTI, Runway, Loan Deficit, Debt Snowball
│   │   ├── src/types/             # TypeScript schemas & Zod validators
│   │   └── src/constants/         # Mock data & brand constants
│   │
│   ├── ui/                        # Shared UI Components & Design System
│   │   ├── src/components/        # Button, Card, RiskGauge, StatusBadge, Modal
│   │   └── src/tokens/            # Strict Nera Color & Typography Tokens
│   │
│   ├── ai/                        # AI Prompts & MAIA Router Client
│   │   ├── src/client.ts          # MAIA AI / OpenAI Gateway with offline fallback
│   │   └── src/prompts/           # Prompt Engineering for NerAI Coach
│   │
│   ├── database/                  # Prisma ORM & Database Layer
│   │   ├── prisma/schema.prisma   # PostgreSQL Schema (Neon)
│   │   └── prisma/seed.ts         # Seed script for Budi (Tel-U)
│   │
│   ├── config-tailwind/           # Shared Tailwind CSS preset & theme tokens
│   └── config-typescript/         # Shared tsconfig base configurations
│
├── pnpm-workspace.yaml            # Workspace definitions
├── turbo.json                     # Turborepo task pipeline
└── package.json                   # Root package & scripts
```

---

## 🎨 Design System Tokens (Strict Usage)

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Purple** | `#6C5CE7` | CTA Utama, Tab Aktif, Badge Highlight |
| **Secondary Blue** | `#4EA8FF` | Progress Bar Runway, Pocket Harian |
| **BNI Teal** | `#00747F` | Elemen Native BNI / Life Goals |
| **Status Safe (Aman)** | `#22C55E` (`#DDF0E6` soft) | Skor 0–39 (Stabil & Sehat) |
| **Status Warning (Waspada)** | `#FBBF24` (`#FBF0D9` soft) | Skor 40–69 (Perlu Perhatian) |
| **Status Critical (Kritis)** | `#EF4444` (`#FBE4DE` soft) | Skor 70–100 (Darurat Cicilan) |
| **Canvas Background** | `#F8FAFC` | Latar Belakang Layar PWA |
| **Card Surface** | `#FFFFFF` | Rounded `20px`, Border `#E2E8F0`, Shadow Subtil |

---

## 🔄 5 Core User Flows

1. **FLOW A: Onboarding & Family Hub (`/family-hub`)**
   - Transparansi izin mutasi rekening.
   - Pairing akun Orang Tua dan Anak via QR code / link.
   - Smart Allowance Splitter (80% Kebutuhan Harian / 20% Tabungan Wajib BNI Life Goals).

2. **FLOW B: Daily Runway & Smart Pocket (`/`)**
   - Hero Runway Card: *"Uangmu bertahan X hari lagi"* (Safe spend: Rp45rb/hari).
   - Smart Nudges tagihan kampus (UKT/Kos).
   - End-of-Month Sweep Modal ke BNI Life Goals.

3. **FLOW C: AI Risk Intelligence & 24h Guardrail (`/risk-check`)**
   - Simulasi pinjaman & kalkulasi defisit riil dalam Rupiah.
   - 24-Hour Cooling-Off Timer untuk mencegah keputusan impulsif.
   - Rekomendasi alternatif aman kampus (Kopma 0% bunga, BNI Fleksi Pendidikan).

4. **FLOW D: AI Recovery Consultant (`/recovery`)**
   - Otomatis aktif saat terdeteksi *stacking* / status **KRITIS**.
   - Strategi pelunasan terstruktur dengan metode **Debt Snowball**.
   - Penawaran investasi otomatis dikunci total selama masa krisis.

5. **FLOW E: Adaptive Wealth Engine (`/wealth-engine`)**
   - Tangga kemapanan finansial berjenjang 3-Tier.
   - Tier 1: Dana Darurat 3x pengeluaran (BNI Life Goals) - Wajib 100%.
   - Tier 2: Reksa Dana Pasar Uang wondr (Mulai Rp10.000, ~5.2% p.a.).
   - Tier 3: SBN / Sukuk Tabungan wondr.

---

## ⚡ Quick Start & Development

### 1. Install Dependencies
```bash
pnpm install
# atau
npm install
```

### 2. Konfigurasi Environment Variables
Salin `.env.example` ke `.env`:
```bash
cp .env.example .env
```

### 3. Menjalankan Server Development
```bash
# Menjalankan seluruh aplikasi (Web PWA + API)
pnpm dev

# Atau jalankan aplikasi web PWA saja (Port 3000)
pnpm dev:web

# Atau jalankan backend API service saja (Port 4000)
pnpm dev:api
```

Buka **http://localhost:3000** pada browser untuk melihat tampilan PWA mobile frame Nera.

---

## 🧪 Build & Typecheck
```bash
pnpm build
pnpm typecheck
```
