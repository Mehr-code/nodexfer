import React from "react";

// ---------- پیام‌ها ----------
function Message({ text }) {
  if (!text) return null;
  const color = text.startsWith("❌") ? "text-red-500" : "text-green-500";
  return <p className={`my-2 ${color} font-medium`}>{text}</p>;
}

export default Message;
