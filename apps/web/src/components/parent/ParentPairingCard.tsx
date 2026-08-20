"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button } from "@nera/ui";
import { KeyRound, CheckCircle2, ShieldCheck } from "lucide-react";
import { useFinancialStore } from "../../context/FinancialStore";

const MOCK_PAIRING_CODE = "NERA-PAIR-BUDI-1301";

export const ParentPairingCard: React.FC = () => {
  const completeParentPairing = useFinancialStore((s) => s.completeParentPairing);
  const [code, setCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAccept = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => completeParentPairing(), 900);
  };

  return (
    <div className="px-4 py-4">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Card className="p-8 flex flex-col items-center text-center space-y-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-[#DDF0E6] text-[#22C55E] flex items-center justify-center"
              >
                <CheckCircle2 size={34} />
              </motion.div>
              <h3 className="text-base font-bold text-[#0F172A]">Akun Berhasil Terhubung!</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Kamu sekarang bisa memantau status keamanan finansial Budi secara read-only.
              </p>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-0 overflow-hidden">
              <div className="bg-gradient-to-br from-[#00747F] to-[#0C4A6E] p-5 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-white/80" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/90">
                    Nera Family Hub
                  </h3>
                </div>
                <h4 className="text-sm font-bold leading-snug">Hubungkan Akun Keluarga</h4>
                <p className="text-[11px] text-white/75 leading-relaxed">
                  Masukkan kode pairing yang dibagikan anakmu, atau terima undangan lewat link WhatsApp.
                  Nera hanya membaca <strong className="text-white">kategori mutasi</strong> — tidak pernah membaca detail transaksi.
                </p>
              </div>

              <form onSubmit={handleAccept} className="p-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                    Kode Pairing
                  </label>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder={MOCK_PAIRING_CODE}
                      className="w-full pl-9 pr-3 py-2.5 text-sm font-mono border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#00747F]"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" variant="bni" fullWidth>
                  Terima Undangan
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
