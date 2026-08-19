# PROJECT CONTEXT: NERA (wondr by BNI Financial Safety Module)

## 1. Project Overview & Vision
* **Product Name:** Nera
* **Tagline:** Predict Risk. Borrow Smart. Live Free.
* **Core Value Proposition:** Platform kecerdasan finansial berbasis AI yang terintegrasi secara *native/embedded* di dalam aplikasi **wondr by BNI** untuk melindungi generasi muda dari jebakan pinjaman berisiko, mengunci tabungan simpanan (CASA), dan meningkatkan transaksi harian BNI.
* **The "Missing Dimension":** Melengkapi 3 pilar eksisting wondr (Transaksi, Insight, Growth) dengan pilar ke-4: **SAFETY** (mencegah keuangan nasabah jebol).
* **The Protection Cliff Problem:** Mengisi celah kerentanan saat anak bertransisi dari BNI Taplus Anak (proteksi penuh) ke BNI Taplus Muda (tanpa proteksi, rentan terjerat pinjol).

---

## 2. Tech Stack & Platform
* **Platform:** Progressive Web App (PWA) dioptimalkan untuk tampilan *mobile frame* (iPhone 15/16 Pro Frame: `max-w-[430px] mx-auto min-h-screen`).
* **Framework:** Next.js 14+ (App Router), TypeScript.
* **Styling:** Tailwind CSS (mengikuti Design System Nera).
* **State Management:** `zustand` dengan persistensi `localStorage`.
* **Icons:** `lucide-react`.
* **PWA Engine:** `@serwist/next` + `manifest.json` (*standalone display*).

---

## 3. Design System & Style Tokens

### Colors (Strict Usage)
* **Primary Purple:** `#6C5CE7` (CTA utama, tab aktif, badge highlight)
* **Secondary Blue:** `#4EA8FF` (Progress bar runway, badge sekunder)
* **BNI Teal:** `#00747F` (Integrasi elemen native BNI / Life Goals)
* **Status Safe (Aman):** `#22C55E` (Background soft: `#DDF0E6`)
* **Status Warning (Waspada):** `#FBBF24` (Background soft: `#FBF0D9`)
* **Status Critical (Kritis):** `#EF4444` (Background soft: `#FBE4DE`)
* **Typography Dark:** `#0F172A` (Heading H1-H3)
* **Typography Muted:** `#7D8A9E` / `#64748B` (Keterangan, label, subtext)
* **Canvas Background:** `#F8FAFC`
* **Card Surface:** `#FFFFFF` dengan `border border-[#E2E8F0]`, `rounded-[20px]`, dan `shadow-[0_2px_12px_rgba(15,23,42,0.04)]`

### Typography & Copywriting Tone
* **Font:** Poppins / Clean System Sans-Serif.
* **Tone:** Positif, objektif, solutif, tidak menggurui.
* **Golden Copy Rule:** JANGAN sebut kata "pinjol" atau "utang" pada fitur rutin harian (Flow B). Gunakan istilah "Kebutuhan Harian", "Runway Saldo", dan "Tabungan Simpanan".

---

## 4. Core Features & User Flows

**[ FLOW A: Onboarding & Family Hub ]**
* Izin baca mutasi transparan (batasan sebelum manfaat)
* Parent-Child Account Pairing (QR / Share Link)
* Smart Allowance Splitter (80% Kebutuhan Harian / 20% Tabungan Wajib BNI)

**[ FLOW B: Daily Runway & Smart Pocket (Beranda) ]**
* Hero Card Runway: "Uangmu bertahan X hari lagi" (Safe daily spend: Rp45rb/hari)
* Smart Nudges: Deteksi tagihan kos/UKT (Bayar via BNI)
* End-of-Month Sweep Modal: Sisa saldo bulanan disapu otomatis ke BNI Life Goals

**[ FLOW C: AI Risk Intelligence & 24h Guardrail ]**
* Kalkulasi defisit riil dalam Rupiah ("Tekor Rp250rb/bulan sejak bulan pertama")
* 24-Hour Cooling-Off Timer (jeda tunda keputusan impulsif)
* Safer Campus Alternatives (Koperasi Mahasiswa, Dana Darurat Kampus 0%)

**[ FLOW D: AI Recovery Consultant ]**
* Terpicu saat terdeteksi siklus gali lubang tutup lubang (stacking)
* Urutan pelunasan terstruktur (Debt Snowball) & rujukan konseling kampus
* SEMUA tawaran produk investasi BNI dikunci total selama krisis

**[ FLOW E: Adaptive Wealth Engine (Staged Wealth Ladder) ]**
* Hanya terbuka jika Skor Finansial Hijau (Aman) 2 bulan berturut-turut
* Tier 1: Dana Darurat 3x pengeluaran (BNI Life Goals) - Wajib Selesai 100%
* Tier 2: Reksa Dana Pasar Uang wondr (Mulai Rp10.000, ~5.2% p.a.)
* Tier 3: SBN / Obligasi Negara (Terkunci sampai konsisten di Tier 2)

---

## 5. AI State Machine Logic (Financial Score)

Sistem Nera digerakkan oleh **Skor Risiko Finansial (0–100)**:

1. 🟢 **Status AMAN (Skor 0–39):**
  * Flow B aktif, Flow E terbuka.
  * Dorong autodebet BNI Life Goals dan Reksa Dana.
2. 🟡 **Status WASPADA (Skor 40–69):**
  * Flow C siaga, Flow E terkunci.
  * Simulasi risiko terpicu, tawaran produk investasi disembunyikan.
3. 🔴 **Status KRITIS (Skor 70–100):**
  * Flow D aktif, Flow E terkunci total.
  * Rencana pelunasan darurat, proteksi reputasi bank dengan mematikan semua *upselling*.

---

## 6. Directory Map (Expected File Structure)

* `src/app/page.tsx` -> Beranda wondr + Nera Hero Runway Card + Nudges
* `src/app/family-hub/` -> Pairing Ortu-Anak & Smart Allowance Splitter
* `src/app/risk-check/` -> Simulator pinjaman, kalkulator defisit & timer 24 jam
* `src/app/wealth-engine/` -> 3-Tier Staged Wealth Ladder
* `src/app/coach/` -> NerAI Chat Consultant
* `src/context/FinancialStore.ts` -> Zustand store data mutasi, saldo pocket, dan skor
* `src/components/common/` -> TopAppBar, BottomNav (5 tabs), Badges, Modals
