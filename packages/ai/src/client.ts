import { NERA_SYSTEM_PROMPT } from "./prompts";

export interface MaiaClientOptions {
  apiKey?: string;
  baseUrl?: string;
}

export class MaiaAIClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(options?: MaiaClientOptions) {
    this.apiKey = options?.apiKey || process.env.MAIA_API_KEY || "";
    this.baseUrl = options?.baseUrl || process.env.MAIA_BASE_URL || "https://router.maia.id/v1";
  }

  async generateChatResponse(messages: { role: "system" | "user" | "assistant"; content: string }[]): Promise<string> {
    if (!this.apiKey) {
      return this.getFallbackResponse(messages[messages.length - 1]?.content || "");
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: NERA_SYSTEM_PROMPT },
            ...messages,
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        return this.getFallbackResponse(messages[messages.length - 1]?.content || "");
      }

      const data = await response.json();
      return data?.choices?.[0]?.message?.content || this.getFallbackResponse("");
    } catch {
      return this.getFallbackResponse(messages[messages.length - 1]?.content || "");
    }
  }

  private getFallbackResponse(userMessage: string): string {
    const lower = userMessage.toLowerCase();
    if (lower.includes("uang saku") || lower.includes("allowance") || lower.includes("budget")) {
      return "Hai! Dengan Smart Allowance Splitter di Nera, uang saku kamu otomatis dialokasikan: 80% untuk Kebutuhan Harian dan 20% langsung diamankan ke BNI Life Goals. Ini memastikan runway harianmu tetap sehat!";
    }
    if (lower.includes("pinjam") || lower.includes("cicilan") || lower.includes("simulasi")) {
      return "Sebelum mengambil komitmen cicilan baru, yuk hitung beban DTI dan defisit bulanan di menu Simulasi Risiko. Kami juga menyediakan alternatif aman kampus seperti Kopma atau Dana Darurat 0% bunga!";
    }
    if (lower.includes("investasi") || lower.includes("reksa dana") || lower.includes("sbn")) {
      return "Keren! Untuk mulai berinvestasi di Reksa Dana wondr atau SBN, pastikan Dana Darurat (Tier 1) di BNI Life Goals sudah terpenuhi 100% dan skor finansialmu dalam status AMAN ya!";
    }
    return "Halo! Saya NerAI, asisten keamanan finansialmu di wondr by BNI. Ada pos pengeluaran atau perencanaan tabungan yang ingin kita diskusikan hari ini?";
  }
}

export const maiaClient = new MaiaAIClient();
