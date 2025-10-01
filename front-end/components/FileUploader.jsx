"use client";
import { useState } from "react";
import axios from "axios";
import { useApi } from "../context/apiContext";

export default function FileUploader({ onUploadComplete }) {
  const apiBase = useApi();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return onUploadComplete("❌ فایل انتخاب نشده");
    if (!apiBase) return onUploadComplete("❌ API هنوز آماده نیست");

    setLoading(true);
    onUploadComplete("");

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await axios.post(`${apiBase}/api/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onUploadComplete(res.data.message);
      setFile(null);
    } catch (err) {
      console.error(err);
      onUploadComplete("❌ خطا در آپلود فایل");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border border-gray-300 rounded px-2 py-1"
      />
      <button
        onClick={handleUpload}
        disabled={loading || !apiBase}
        className={`px-4 py-2 rounded text-white font-medium transition ${
          loading || !apiBase
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "درحال ارسال..." : "ارسال فایل"}
      </button>
    </div>
  );
}
