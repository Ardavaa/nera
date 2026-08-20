import React from "react";
import { cn } from "../tokens";

export interface TrustBannerProps {
  icon: React.ReactNode;
  eyebrow?: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  showSparkles?: boolean;
  className?: string;
}

/**
 * Shared "read-only / privacy-first" gradient banner used anywhere Nera
 * explains what data it reads and why (Family Hub consent, Privileges Hub
 * transparency note, Parent pairing screen). Keeping this in one place means
 * a style change only needs to happen once.
 */
export const TrustBanner: React.FC<TrustBannerProps> = ({
  icon,
  eyebrow,
  title,
  children,
  showSparkles = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-[#00747F] to-[#0C4A6E] text-white relative overflow-hidden rounded-t-[20px]",
        eyebrow || title ? "p-5" : "p-4 flex items-start gap-3",
        className
      )}
    >
      {showSparkles && (
        <>
          <span className="absolute top-4 right-8 text-white/20 text-lg animate-pulse">✦</span>
          <span className="absolute bottom-6 right-16 text-white/10 text-sm">✦</span>
        </>
      )}

      {eyebrow || title ? (
        <>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white/80 [&>svg]:block">{icon}</span>
            {eyebrow && (
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/90">
                {eyebrow}
              </h3>
            )}
          </div>
          {title && <h4 className="text-sm font-bold leading-snug">{title}</h4>}
          <p className="text-[11px] text-white/75 leading-relaxed mt-1.5">{children}</p>
        </>
      ) : (
        <>
          <span className="text-white/85 shrink-0 mt-0.5 [&>svg]:block">{icon}</span>
          <p className="text-[11px] text-white/85 leading-relaxed">{children}</p>
        </>
      )}
    </div>
  );
};
