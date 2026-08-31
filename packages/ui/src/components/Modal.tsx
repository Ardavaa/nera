import React, { useEffect } from "react";
import { cn } from "../tokens";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className={cn(
          "w-full max-w-[430px] bg-white rounded-[24px] shadow-2xl overflow-hidden p-6 transition-all transform animate-slide-up max-h-[85vh] overflow-y-auto",
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-4">
          <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#64748B] hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
