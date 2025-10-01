"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://192.168.1.107:5000"; // IP لینوکس

export default function FileManager() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchList = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/list`);
      setFiles(res.data || []);
    } catch (err) {
      setMessage("❌ خطا در دریافت لیست فایل‌ها");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const upload = async () => {
    if (!file) return setMessage("فایل انتخاب نشده");
    setLoading(true);
    setMessage("");

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await axios.post(`${API_BASE}/api/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      fetchList();
    } catch (err) {
      setMessage("❌ خطا در آپلود فایل");
      console.error(err);
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
      {message && <p>{message}</p>}

      <h3>فایل‌های سرور</h3>
      <ul>
        {files.map((f) => (
          <li key={f.name}>
            {f.name} — {(f.size / 1024).toFixed(1)} KB
            <a
              style={{ marginLeft: 10 }}
              href={`${API_BASE}/api/download/${encodeURIComponent(f.name)}`}
            >
              دانلود
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
