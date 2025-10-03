// /app/api/config/route.js  (یا pages/api/config.js بسته به ساختار)
import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get("http://localhost:5000/api/config"); // Express همیشه روی سرور خودش localhost
    return new Response(JSON.stringify(res.data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "خطا در دریافت config" }), {
      status: 500,
    });
  }
}
