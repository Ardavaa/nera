import React from "react";

interface NeraRobotAvatarProps {
  size?: number;
  className?: string;
}

export const NeraRobotAvatar: React.FC<NeraRobotAvatarProps> = ({
  size = 72,
  className = "",
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full flex items-center justify-center p-1.5 shadow-md ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer deep blue ring */}
        <circle cx="50" cy="50" r="48" fill="#0C447C" />
        <circle cx="50" cy="50" r="48" stroke="#1D68B2" strokeWidth="2" />

        {/* Thick white middle ring */}
        <circle cx="50" cy="50" r="40" fill="white" />

        {/* Inner dark robot head container */}
        <circle cx="50" cy="50" r="33" fill="#141E28" />

        {/* Small top antenna */}
        <rect x="48" y="23" width="4" height="6" rx="2" fill="white" />
        <circle cx="50" cy="22" r="3" fill="#38BDF8" />

        {/* Cute side ear nubs */}
        <rect x="19" y="46" width="3" height="8" rx="1.5" fill="white" />
        <rect x="78" y="46" width="3" height="8" rx="1.5" fill="white" />

        {/* Robot Face Screen */}
        <rect
          x="24"
          y="31"
          width="52"
          height="38"
          rx="14"
          fill="#0F172A"
          stroke="#1E293B"
          strokeWidth="1.5"
        />

        {/* Left Eye (Oval with slight highlight) */}
        <ellipse cx="39" cy="46" rx="4.5" ry="5.5" fill="white" />
        <circle cx="40.5" cy="44.5" r="1.5" fill="#38BDF8" />

        {/* Right Eye (Oval with slight highlight) */}
        <ellipse cx="61" cy="46" rx="4.5" ry="5.5" fill="white" />
        <circle cx="62.5" cy="44.5" r="1.5" fill="#38BDF8" />

        {/* Cute gentle curved smile */}
        <path
          d="M 43 55 Q 50 61 57 55"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Subtle rosy cheek blushes */}
        <ellipse cx="33" cy="53" rx="2.5" ry="1.2" fill="#F43F5E" opacity="0.6" />
        <ellipse cx="67" cy="53" rx="2.5" ry="1.2" fill="#F43F5E" opacity="0.6" />
      </svg>
    </div>
  );
};
