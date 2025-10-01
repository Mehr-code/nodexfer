"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FileManager() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/list");
      setFiles(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const upload = async () => {
    if (!file) return alert("فایل انتخاب نشده");
    setLoading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", fd);
      alert(res.data.message);
      fetchList();
    } catch (err) {
      alert("❌ خطا در آپلود");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📂 NodeXfer</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload} disabled={loading}>
        {loading ? "درحال ارسال..." : "ارسال فایل"}
      </button>

      <h3>فایل‌های سرور</h3>
      <ul>
        {files.map((f) => (
          <li key={f.name}>
            {f.name} — {(f.size / 1024).toFixed(1)} KB
            <a
              style={{ marginLeft: 10 }}
              href={`http://localhost:5000/api/download/${encodeURIComponent(
                f.name
              )}`}
            >
              دانلود
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
