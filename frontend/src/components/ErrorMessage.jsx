import React from "react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="glass-card p-6 rounded-2xl bg-red-600/20 border border-red-500/20 text-white max-w-md">
      <h3 className="text-lg font-bold mb-2">Error</h3>
      <p className="mb-4">{message}</p>
      <div className="flex gap-3 justify-center">
        {onRetry && (
          <button onClick={onRetry} className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
