#!/bin/bash

echo "🚀 Starting File Sharing Project..."
echo "-----------------------------------"

# رفتن به مسیر سرور
cd "$(dirname "$0")/server"

echo "⚙️  Running updateEnv.js..."
node updateEnv.js

echo "🧠 Starting server..."
node index.js &  # سرور رو در پس‌زمینه اجرا می‌کنیم

sleep 7  # صبر برای بالا اومدن سرور

# رفتن به مسیر فرانت‌اند
cd ../front-end

echo "💻 Starting frontend (Next.js)..."
npm run dev &

sleep 5

# باز کردن مرورگر
xdg-open http://localhost:3000

echo "✅ All systems are up!"
