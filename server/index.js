require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// جایگزین IP لینوکس خودت
const NEXTJS_ORIGIN = "http://192.168.1.107:3000";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  })
);

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const upload = multer({ dest: uploadDir });

// آپلود فایل
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "فایل انتخاب نشده" });

  const destPath = path.join(__dirname, "uploads", req.file.originalname);
  fs.rename(req.file.path, destPath, (err) => {
    if (err) return res.status(500).json({ error: "❌ خطا در ذخیره فایل" });
    res.json({ message: "✅ فایل منتقل شد", filename: req.file.originalname });
  });
});

// دانلود فایل
app.get("/api/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  if (!fs.existsSync(filePath))
    return res.status(404).json({ error: "فایل یافت نشد" });

  res.download(filePath, req.params.filename);
});

// لیست فایل‌ها
app.get("/api/list", (req, res) => {
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) return res.status(500).json({ error: "❌ خطا در لیست فایل‌ها" });

    const list = files.map((f) => {
      const stats = fs.statSync(path.join(__dirname, "uploads", f));
      return { name: f, size: stats.size };
    });

    res.json(list);
  });
});

app.delete("/api/delete/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "❌ فایل یافت نشد" });
  }

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ error: "❌ خطا در حذف فایل" });
    res.json({ message: `✅ فایل ${filename} حذف شد` }); // body ارسال می‌کنه
  });
});

app.get("/api/config", (req, res) => {
  res.json({
    host: process.env.SFTP_HOST,
    port: process.env.SFTP_PORT,
  });
});

// ران روی همه اینترفیس‌ها
app.listen(5000, "0.0.0.0", () =>
  console.log("🚀 Express server running on port 5000")
);
