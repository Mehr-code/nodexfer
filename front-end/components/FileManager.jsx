"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ApiProvider, useApi } from "../context/apiContext";
import FileUploader from "./FileUploader";
import FileList from "./FileList";

function FileManagerContent() {
  const apiBase = useApi();
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const fetchList = async () => {
    if (!apiBase) return;
    try {
      const res = await axios.get(`${apiBase}/api/list`);
      setFiles(res.data || []);
    } catch (err) {
      console.error(err);
      setMessage("❌ خطا در دریافت لیست فایل‌ها");
    }
  };

  useEffect(() => {
    if (!apiBase) return;
    fetchList();
  }, [apiBase]);

  const handleDelete = (fileName) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
    setMessage(`✅ فایل "${fileName}" حذف شد`);
  };
  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      {/* Card اصلی */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700">
          📂 NodeXfer
        </h2>

        {/* آپلودر */}
        <FileUploader
          onUploadComplete={(msg) => {
            setMessage(msg);
            fetchList();
          }}
        />

        {/* پیام وضعیت */}
        {message && (
          <p
            className={`my-3 text-sm px-3 py-2 rounded-lg ${
              message.startsWith("❌")
                ? "bg-red-100 text-red-600 border border-red-300"
                : "bg-green-100 text-green-600 border border-green-300"
            }`}
          >
            {message}
          </p>
        )}

        {/* لیست فایل‌ها */}
        <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-700">
          📑 فایل‌های سرور
        </h3>
        <FileList files={files} onDelete={handleDelete} />
      </div>
    </div>
  );
}

// Wrapper با ApiProvider
export default function FileManager() {
  return (
    <ApiProvider>
      <FileManagerContent />
    </ApiProvider>
  );
}
