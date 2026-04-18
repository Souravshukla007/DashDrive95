import React from "react";

/**
 * DummyDataBanner — drop this at the top of any page/section that uses mock data.
 * @param message Optional custom message. Defaults to a generic disclaimer.
 */
export default function DummyDataBanner({ message }: { message?: string }) {
  return (
    <div className="w-full bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center gap-3">
        <span className="text-amber-500 shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </span>
        <p className="text-xs text-amber-700 font-medium">
          {message ?? (
            <>
              <span className="font-bold">Demo Data Only.</span>{" "}
              The figures, statistics, and content shown on this page are illustrative placeholders and do not reflect real DashDrive operational data.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
