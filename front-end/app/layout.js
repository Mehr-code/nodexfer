import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// فونت‌های اصلی
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "NodeXfer - File Manager",
  description: "A clean and modern file manager built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} 
          antialiased min-h-screen 
          bg-background text-foreground 
          transition-colors duration-500
        `}
      >
        {/* هدر کلی اپ */}
        <header className="w-full px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-[var(--color-card)]  shadow-sm">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">🚀 NodeXfer</h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Simple & Modern File Manager
            </span>
          </div>
        </header>

        {/* محتوای اصلی */}
        <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>

        {/* فوتر */}
        <footer className="mt-12 py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
          ساخته شده با 🧀 توسط مهر
        </footer>
      </body>
    </html>
  );
}
