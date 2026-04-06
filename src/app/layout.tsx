import type { Metadata } from "next";
// Menggunakan font Inter bawaan Next.js sebagai base font
import { Inter } from "next/font/google";
import "./globals.css";

// Import komponen buatan kita
import { Navbar } from "@/components/custom/Navbar";
import { Footer } from "@/components/custom/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Culinary Heirloom",
  description: "Tradisi Minang dalam Sentuhan Modern",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Navbar muncul di semua halaman */}
        <Navbar />

        {/* Main content area dengan background krem/putih tulang */}
        <main className="min-h-screen bg-[#FAF7F2]">{children}</main>

        <Footer />

        {/* Toaster untuk notifikasi pop-up masuk keranjang */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
