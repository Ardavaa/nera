"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ArrowLeft, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { DemoControlPanel } from "./DemoControlPanel";

export interface TopAppBarProps {
  title?: string;
  showBack?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ title, showBack = false }) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Branding or Title */}
        {title ? (
          <div className="flex items-center gap-2.5">
            {showBack && (
              <button
                onClick={() => router.back()}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#0F172A] hover:bg-slate-100 transition-colors -ml-1"
                aria-label="Kembali"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h1 className="text-base font-bold text-[#0F172A]">{title}</h1>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Image
              src="/logos/nera-logo.png"
              alt="Nera Logo"
              width={100}
              height={32}
              className="h-7.5 w-auto object-contain"
              priority
            />
            <div className="h-5 w-[1.5px] bg-[#CBD5E1]" />
            <Image
              src="/logos/wondr-bni.svg"
              alt="wondr by BNI"
              width={105}
              height={28}
              className="h-6.5 w-auto object-contain"
              priority
            />
          </div>
        )}

        {/* Right: NerAI Coach + Notification Bell */}
        <div className="flex items-center gap-1">
          {/* NerAI Coach Button */}
          <Link
            href="/coach"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#6C5CE7] hover:bg-[#6C5CE7]/10 transition-colors"
            aria-label="NerAI Coach"
          >
            <MessageCircle size={20} />
          </Link>

          {/* Notification Bell */}
          <button
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#0F172A] hover:bg-slate-100 transition-colors"
            aria-label="Notifikasi"
          >
            <Bell size={22} className="text-[#0F172A]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6C5CE7] ring-2 ring-white" />
          </button>

          {/* Demo-only: role switcher + persona scenario switcher (judge/demo aid) */}
          <DemoControlPanel />
        </div>
      </div>
    </header>
  );
};
