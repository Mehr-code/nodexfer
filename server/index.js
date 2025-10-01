require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const SftpClient = require("ssh2-sftp-client");

const app = express();
app.use(cors());

const upload = multer({ dest: path.join(__dirname, "uploads") });

const sftpConfig = {
  host: process.env.SFTP_HOST,
  port: process.env.SFTP_PORT || 22,
  username: process.env.SFTP_USER,
  password: process.env.SFTP_PASS,
};

// آپلود فایل به لینوکس
app.post("/api/upload", upload.single("file"), async (req, res) => {
  const sftp = new SftpClient();
  try {
    await sftp.connect(sftpConfig);
    const remotePath = `/home/${sftpConfig.username}/${req.file.originalname}`;
    await sftp.put(req.file.path, remotePath);
    await sftp.end();

    // پاک کردن فایل موقت
    fs.unlinkSync(req.file.path);

    res.json({ message: "✅ فایل منتقل شد", filename: req.file.originalname });
  } catch (err) {
    console.error(err);
    fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "❌ خطا در انتقال فایل" });
  }
});

// دانلود فایل از لینوکس
app.get("/api/download/:filename", async (req, res) => {
  const sftp = new SftpClient();
  try {
    await sftp.connect(sftpConfig);
    const remotePath = `/home/${sftpConfig.username}/${req.params.filename}`;
    const stream = await sftp.get(remotePath);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${req.params.filename}"`
    );
    stream.pipe(res);
    stream.on("close", async () => await sftp.end());
    stream.on("error", async () => {
      await sftp.end();
      res.status(500).end();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ دانلود ناموفق بود" });
  }
});

// لیست فایل‌ها
app.get("/api/list", async (req, res) => {
  const sftp = new SftpClient();
  try {
    await sftp.connect(sftpConfig);
    const list = await sftp.list(`/home/${sftpConfig.username}`);
    await sftp.end();
    res.json(list.map((f) => ({ name: f.name, size: f.size })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ خطا در لیست فایل‌ها" });
  }
});

app.listen(5000, () => console.log("🚀 Express server running on port 5000"));
