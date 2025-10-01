"use client";
import { useApi } from "../context/apiContext";
import axios from "axios";

export default function FileList({ files, onDelete }) {
  const apiBase = useApi();

  if (!files.length)
    return (
      <p className="text-gray-400 italic text-center py-6">
        📂 هنوز هیچ فایلی آپلود نشده است.
      </p>
    );

  const handleDelete = async (fileName) => {
    if (!apiBase) return;
    if (!confirm(`آیا مطمئن هستید می‌خواهید "${fileName}" را حذف کنید؟`))
      return;

    try {
      await axios.delete(
        `${apiBase}/api/delete/${encodeURIComponent(fileName)}`
      );
      onDelete(fileName);
    } catch (err) {
      console.error(err);
      alert("❌ خطا در حذف فایل");
    }
  };

  return (
    <ul className="space-y-3">
      {files.map((f) => (
        <li
          key={f.name}
          className="flex justify-between items-center bg-white border border-gray-200 rounded-xl shadow-sm px-4 py-3 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col">
            <span className="font-medium text-gray-800 truncate max-w-xs">
              {f.name}
            </span>
            <span className="text-xs text-gray-500">
              {(f.size / 1024).toFixed(1)} KB
            </span>
          </div>
          <div className="flex gap-2">
            <a
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow"
              href={`${apiBase}/api/download/${encodeURIComponent(f.name)}`}
            >
              ⬇ دانلود
            </a>
            <button
              onClick={() => handleDelete(f.name)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-300 shadow"
            >
              🗑 حذف
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
