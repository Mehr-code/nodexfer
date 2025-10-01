// updateEnv.js
const os = require("os");
const fs = require("fs");
const path = require("path");

function getLocalIP() {
  const ifaces = os.networkInterfaces();
  for (const iface of Object.values(ifaces)) {
    for (const alias of iface) {
      if (alias.family === "IPv4" && !alias.internal) return alias.address;
    }
  }
  return null;
}

const ip = getLocalIP();
if (!ip) throw new Error("IP پیدا نشد");

const envPath = path.join(__dirname, ".env");
let content = fs.readFileSync(envPath, "utf8");

// جایگزین خط SFTP_HOST با IP جدید
if (/^SFTP_HOST=.*$/m.test(content)) {
  content = content.replace(/^SFTP_HOST=.*$/m, `SFTP_HOST=${ip}`);
} else {
  content += `\nSFTP_HOST=${ip}\n`;
}

fs.writeFileSync(envPath, content);
console.log("✅ .env بروزرسانی شد با IP", ip);
