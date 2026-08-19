# 🎨 NERA Design System Specification

> **Official Visual Identity & Design Guidelines**  
> *Source Reference:* [DESIGN_SYSTEM.jpeg](file:///D:/dave-workspace/0_competition/1_hackathon/bni-ventures/llm-context/design_system/DESIGN_SYSTEM.jpeg)

---

## 📌 Brand Overview & Identity

* **Brand Name:** Nera
* **Tagline:** *Predict Risk. Borrow Smart. Live Free.*
* **Mission Statement:**  
  > *"Nera uses AI to predict financial risks before debt becomes a trap, empowering young adults to make smarter borrowing decisions."*
* **Core Brand Attributes:**  
  `Modern` • `Trustworthy` • `Calm` • `Intelligent` • `Youthful`

---

## 01. Color Palette

All UI components, dashboards, and assets must strictly adhere to these hexadecimal values.

| Token Name | Hex Code | RGB | Role / Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#6C5CE7` | `rgb(108, 92, 231)` | Main CTA buttons, active navigation states, primary brand accents, key highlight badges. |
| **Secondary** | `#4EA8FF` | `rgb(78, 168, 255)` | Secondary accents, progress indicators, daily runway charts, interactive links. |
| **Success** | `#22C55E` | `rgb(34, 197, 94)` | Safe / Low Risk financial status, positive indicators, success toasts, verified states. Soft background: `#DDF0E6`. |
| **Warning** | `#FBBF24` | `rgb(251, 191, 36)` | Moderate / Waspada risk status, upcoming due dates, cautionary alerts. Soft background: `#FBF0D9`. |
| **Error** | `#EF4444` | `rgb(239, 68, 68)` | High / Kritis risk alerts, deficit callouts, emergency recovery mode, destructive actions. Soft background: `#FBE4DE`. |
| **Neutral** | `#0F172A` | `rgb(15, 23, 42)` | Main typography headers (H1-H3), dark surface cards, high-contrast text, background base for dark themes. |

### Extended Neutral & Surface Colors
* **Canvas / Background:** `#F8FAFC` (Light clean slate)
* **Card Surface:** `#FFFFFF` (Pure white)
* **Border Color:** `#E2E8F0` (Subtle divider / border)
* **Muted Typography:** `#64748B` / `#7D8A9E` (Subtitles, captions, metadata labels)

---

## 02. Typography

* **Font Family:** **Poppins** (System Sans-Serif fallback: `system-ui, -apple-system, sans-serif`)
* **Tone & Characteristics:** *Modern • Friendly • Trustworthy*

### Type Hierarchy

| Level | Weight | Size | Line Height | Example Copy / Application |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | **Bold (700)** | `32px` (`2rem`) | `1.2` - `1.3` | *"Make safer financial decisions with AI."* (Page titles, hero headers) |
| **H2** | **SemiBold (600)** | `24px` (`1.5rem`) | `1.3` - `1.4` | *"Understand your risk before you borrow."* (Section headings, card titles) |
| **H3** | **SemiBold (600)** | `18px` (`1.125rem`) | `1.4` | Modal headers, widget titles, breakdown labels |
| **Body** | **Regular (400)** | `16px` (`1rem`) | `1.5` - `1.6` | *"Nera analyzes your financial behavior, income stability, and spending patterns to predict potential risks."* |
| **Body Small** | **Regular (400) / Medium (500)** | `14px` (`0.875rem`) | `1.4` | Descriptions, helper texts, table rows |
| **Caption / Badge** | **SemiBold (600)** | `12px` (`0.75rem`) | `1.2` | Status tags, badge text, timestamp labels |

---

## 03. Iconography Style

* **Visual Style:** **Clean • Rounded • Friendly**
* **Icon Set Recommendation:** `lucide-react` (or custom SVG vector set matching 2px stroke and round stroke-caps).
* **Key Icons:**
  * 🛡️ `ShieldCheck` / `ShieldAlert` (Security, Trust, Financial Guardrail)
  * 📈 `TrendingUp` / `Activity` (Cashflow, Runway, Wealth Ladder)
  * ⚠️ `AlertTriangle` / `AlertOctagon` (Risk Warning, Deficit Detection)
  * 💳 `CreditCard` / `Wallet` (Smart Pockets, Transactions)
  * 👤 `User` / `Users` (Profile, Family Hub Pairing)

---

## 04. Visual Style & Design Tokens

* **Corner Radius (Border Radius):**
  * **Cards:** `20px` (`rounded-[20px]`)
  * **Buttons & Inputs:** `14px` (`rounded-[14px]`)
  * **Pills & Badges:** `9999px` (`rounded-full`)
  * **App Icon Container:** `24px` / `rounded-[24px]`
* **Elevation & Shadows:**
  * **Card Shadow:** `0 2px 12px rgba(15, 23, 42, 0.04)`
  * **Elevated Floating Card:** `0 8px 24px rgba(108, 92, 231, 0.12)`
  * **Primary CTA Glow:** `0 4px 16px rgba(108, 92, 231, 0.25)`
* **Layout Constraints:**
  * Mobile PWA container: `max-w-[430px] mx-auto min-h-screen` (iPhone 15/16 Pro Frame)

---

## 05. UI Elements & Component Specs

### 1. Primary Button
* **Background:** `#6C5CE7` (Primary Purple)
* **Hover State:** `#5B4CD4`
* **Text Color:** `#FFFFFF` (Bold / SemiBold)
* **Corner Radius:** `14px` (or pill `9999px`)
* **Height:** `44px` (Standard) / `52px` (Large CTA)
* **Shadow:** `0 4px 14px rgba(108, 92, 231, 0.2)`

### 2. Secondary Button
* **Background:** `#FFFFFF`
* **Border:** `1px solid #E2E8F0`
* **Text Color:** `#0F172A`
* **Hover State:** `#F8FAFC`

### 3. Risk Score Widget / Gauge
* **Container:** White surface Card with `border border-[#E2E8F0]`, `rounded-[20px]`.
* **Title:** `"Risk Score"` in `#64748B` font-semibold.
* **Status Badge:** `"Low Risk"` (`#22C55E`), `"Moderate Risk"` (`#FBBF24`), `"High Risk"` (`#EF4444`).
* **Circular Score Gauge:** Circular progress indicator with score value (e.g. `72`) centered, color-coded by risk state.

### 4. Toast / Alert Notifications
* **Container:** White floating card, rounded `16px`, shadow `0 8px 24px rgba(0,0,0,0.08)`, border `border-[#E2E8F0]`.
* **Icon:** Green circular checkmark `#22C55E` / Warning `#FBBF24` / Error `#EF4444`.
* **Text:** Title (e.g. *"Great! Your risk level is low."*) + Dismiss button (`X`).

---

## 06. Logo & Brand Variations

1. **Horizontal Layout:** Symbol on the left + `Nera` wordmark on the right (Standard header & navbar usage).
2. **Vertical Layout:** Symbol centered on top + `Nera` wordmark below (Splash screen, pitch decks, cover pages).
3. **Symbol / App Icon:** Folded gradient 'N' ribbon with top-right sparkle inside a gradient blue/purple rounded square (`rounded-[24px]`).
4. **Background Applications:**
   * **On Light Background:** Gradient ribbon mark + `#0F172A` wordmark.
   * **On Dark Background (`#0F172A` / `#0B132B`):** Gradient ribbon mark + `#FFFFFF` wordmark.
   * **On Brand Gradient Background:** Monochromatic white mark + white wordmark.

---

> [!NOTE]
> All code in `@nera/ui`, `@nera/config-tailwind`, and `@nera/web` must reference these tokens directly to maintain strict brand consistency.
