"use client";
import { useApi } from "../context/apiContext";
import { useState, useRef } from "react";

export default function ApiInfo() {
  const context = useApi();
  if (!context) return <p>در حال بارگذاری...</p>;
  const { apiBase, error } = context;
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const handleCopy = () => {
    if (!apiBase) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      // حالت معمولی Clipboard API
      navigator.clipboard
        .writeText(apiBase)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    // کپی با استفاده از input مخفی
    if (!inputRef.current) return;
    inputRef.current.value = apiBase;
    inputRef.current.select();
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) return <p>❌ خطا در گرفتن API Base</p>;
  if (!apiBase) return <p>در حال بارگذاری...</p>;

  return (
    <div className="bg-blue-100 border border-blue-400 text-blue-800 p-4 rounded-md mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
      🌐 برای دسترسی به IP مقصد، روی لینک کلیک کنید یا کپی کنید:
      <a
        href={apiBase}
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-mono text-blue-700 hover:text-blue-900"
      >
        {apiBase}
      </a>
      <button
        onClick={handleCopy}
        className="ml-auto px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {copied ? "✅ کپی شد!" : "📋 کپی"}
      </button>
      {/* input مخفی برای fallback */}
      <input ref={inputRef} type="text" className="absolute left-[-9999px]" />
    </div>
  );
}
