"use client";
import { useState } from "react";
import axios from "axios";
import { useApi } from "../context/apiContext";
import { Upload, Loader2 } from "lucide-react";

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
    <div className="flex flex-col sm:flex-row items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-2xl shadow-sm bg-white hover:border-blue-500 transition-all duration-300">
      <label className="flex flex-col items-center justify-center w-full sm:w-auto cursor-pointer px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition">
        <Upload className="w-6 h-6 text-blue-600 mb-1" />
        <span className="text-sm text-gray-600">
          {file ? file.name : "انتخاب فایل"}
        </span>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>

      <button
        onClick={handleUpload}
        disabled={loading || !apiBase}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium shadow-md transition-all duration-300 ${
          loading || !apiBase
            ? "bg-gray-300 cursor-not-allowed text-gray-700"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            درحال ارسال...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            ارسال فایل
          </>
        )}
      </button>
    </div>
  );
}
