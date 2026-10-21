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
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-[#2F240E]/45 backdrop-blur-sm animate-fade-in">
      <div
        className={cn(
          "w-full max-w-[430px] bg-white rounded-[26px] shadow-xl overflow-hidden p-6 animate-slide-up max-h-[85vh] overflow-y-auto",
          className
        )}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E9E5DD] mb-4">
          <h3 className="text-lg font-bold text-[#2F240E]">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#736B60] hover:bg-[#F7F5F0] transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
