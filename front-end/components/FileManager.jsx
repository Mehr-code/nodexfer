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
    if (!apiBase) return; // هنوز آماده نیست
    fetchList();
  }, [apiBase]);

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📂 NodeXfer
      </h2>

      <FileUploader
        onUploadComplete={(msg) => {
          setMessage(msg);
          fetchList();
        }}
      />
      {message && (
        <p
          className={`my-2 ${
            message.startsWith("❌") ? "text-red-500" : "text-green-500"
          } font-medium`}
        ></p>
      )}

      <h3 className="text-xl font-semibold mt-6 mb-2">فایل‌های سرور</h3>
      <FileList files={files} />
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
