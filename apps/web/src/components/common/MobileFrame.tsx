import React from "react";
import { Wifi, Battery } from "lucide-react";
import { BottomNav } from "./BottomNav";

export interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0F172A] flex justify-center items-start sm:py-6">
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[890px] sm:max-h-[920px] bg-[#F8FAFC] flex flex-col relative sm:rounded-[36px] sm:border-[8px] sm:border-[#1E293B] shadow-2xl overflow-hidden">
        
        {/* iOS Status Bar */}
        <div className="w-full bg-white/95 backdrop-blur-md px-6 pt-3 pb-1 flex items-center justify-between z-50 select-none">
          {/* Time */}
          <span className="text-[13px] font-semibold text-[#0F172A] tracking-tight">
            9:41
          </span>

          {/* Dynamic Island Pill */}
          <div className="w-24 h-5 bg-black rounded-full shadow-inner flex items-center justify-end px-2 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#111827]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#030712] ring-1 ring-white/10" />
          </div>

          {/* Status Icons: Signal, WiFi, Battery */}
          <div className="flex items-center gap-1.5 text-[#0F172A]">
            {/* Cellular Signal Bars */}
            <div className="flex items-end gap-[1.5px] h-3">
              <span className="w-[2.5px] h-1 bg-[#0F172A] rounded-[0.5px]" />
              <span className="w-[2.5px] h-1.5 bg-[#0F172A] rounded-[0.5px]" />
              <span className="w-[2.5px] h-2 bg-[#0F172A] rounded-[0.5px]" />
              <span className="w-[2.5px] h-2.5 bg-[#0F172A] rounded-[0.5px]" />
            </div>
            <Wifi size={13} className="stroke-[2.5]" />
            <Battery size={16} className="stroke-[2.2] fill-[#0F172A]" />
          </div>
        </div>
        
        {/* Scrollable Main Screen Container */}
        <div className="flex-1 overflow-y-auto select-none">
          <div className="flex flex-col min-h-full pb-[calc(6rem+env(safe-area-inset-bottom))]">
            {children}
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

