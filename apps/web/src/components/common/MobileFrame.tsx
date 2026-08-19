import React from "react";

export interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0F172A] flex justify-center items-start sm:py-6">
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[890px] sm:max-h-[920px] bg-[#F8FAFC] flex flex-col relative sm:rounded-[36px] sm:border-[8px] sm:border-[#1E293B] shadow-2xl overflow-hidden">
        {/* iOS Dynamic Island / Notch Placeholder */}
        <div className="hidden sm:flex justify-center pt-2 pb-1 bg-transparent absolute top-0 inset-x-0 z-50 pointer-events-none">
          <div className="w-28 h-6 bg-black rounded-full shadow-inner" />
        </div>
        
        {/* Scrollable Main Screen Container */}
        <div className="flex-1 flex flex-col overflow-y-auto pb-24 select-none">
          {children}
        </div>
      </div>
    </div>
  );
};
