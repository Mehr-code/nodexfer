@echo off
echo 🚀 Starting File Sharing Project...
echo -----------------------------------

REM رفتن به مسیر سرور
cd server

echo ⚙️ Running updateEnv.js...
node updateEnv.js

echo 🧠 Starting Express server...
start cmd /k "node index.js"

REM چند ثانیه صبر کن تا سرور بالا بیاد
timeout /t 5 /nobreak >nul

REM رفتن به مسیر فرانت‌اند
cd ../front-end

echo 💻 Starting frontend (Next.js)...
start cmd /k "npm run dev"

REM چند ثانیه صبر کن
timeout /t 5 /nobreak >nul

REM باز کردن مرورگر
start http://localhost:3000

echo ✅ All systems are up!
pause
