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
  homeBrand?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ title, showBack = false }) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Branding or Title */}
        {title ? (
          <div className="flex items-center gap-2.5">
            {showBack && (
              <button
                onClick={() => router.back()}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#2F240E] hover:bg-[#FFF3D6] transition-colors -ml-1"
                aria-label="Kembali"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h1 className="text-base font-bold text-[#2F240E]">{title}</h1>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Image
              src="/logos/nera-home-logo.webp"
              alt="Nera Logo"
              width={112}
              height={34}
              className="h-8 w-auto object-contain"
              priority
              unoptimized
            />
            <div className="h-5 w-[1.5px] bg-[#D8D3C9]" />
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
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#5B410C] bg-[#F5F5F5] hover:bg-[#FFF3D6] transition-colors"
            aria-label="NerAI Coach"
          >
            <MessageCircle size={20} />
          </Link>

          {/* Notification Bell */}
          <button
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#2F240E] bg-[#F5F5F5] hover:bg-[#FFF3D6] transition-colors"
            aria-label="Notifikasi"
          >
            <Bell size={22} className="text-[#2F240E]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFB900] ring-2 ring-white" />
          </button>

          {/* Demo-only: role switcher + persona scenario switcher (judge/demo aid) */}
          <DemoControlPanel />
        </div>
      </div>
    </header>
  );
};
