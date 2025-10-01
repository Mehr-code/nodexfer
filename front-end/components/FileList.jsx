"use client";
import { useApi } from "../context/apiContext";

export default function FileList({ files }) {
  const apiBase = useApi();

  if (!files.length)
    return <p className="text-gray-500 italic">فایلی وجود ندارد.</p>;

  return (
    <ul className="space-y-2">
      {files.map((f) => (
        <li
          key={f.name}
          className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded px-3 py-2"
        >
          <span className="truncate max-w-xs">
            {f.name} — {(f.size / 1024).toFixed(1)} KB
          </span>
          <a
            className="text-blue-600 hover:underline ml-4"
            href={`${apiBase}/api/download/${encodeURIComponent(f.name)}`}
          >
            دانلود
          </a>
        </li>
      ))}
    </ul>
  );
}
