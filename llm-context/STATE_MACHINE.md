# STATE MACHINE LOGIC SPECIFICATION

## Formula Perhitungan Skor Risiko (0–100)
* **Debt-to-Income Ratio (DTI):** `(Total Cicilan Bulanan / Pemasukan Bersih) * 100`
  * DTI <= 20% -> Skor 0–30 (AMAN)
  * 20% < DTI <= 40% -> Skor 31–60 (WASPADA)
  * DTI > 40% -> Skor 61–100 (KRITIS)
* **Runway Multiplier:**
  * Runway >= 14 hari -> Kondisi stabil
  * Runway < 7 hari -> Naikkan status ke WASPADA
  * Stacking / Pindar > 2 sumber -> Paksa status ke KRITIS

## Default State Store Mock Data
```typescript
{
  userName: "Budi",
  campus: "Telkom University",
  score: 34,
  state: "AMAN",
  monthlyAllowance: 2000000,
  dailyPocket: 630000,
  lockPocket: 800000, // BNI Life Goals
  dailyBudgetSafe: 45000,
  runwayDays: 14
}
```
