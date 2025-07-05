import React from "react";

export default function FrameWrapper({ children }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative bg-white rounded-[2.75rem] border-[16px] border-black w-[375px] h-[730px] shadow-2xl overflow-hidden">
        {/* Notch (iPhone X style) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-5 bg-black rounded-b-xl z-20" />

        {/* Actual app content */}
        <div className="absolute inset-0 pt-6 pb-4 h-full overflow-y-auto px-2">
          {children}
        </div>
      </div>
    </div>
  );
}
