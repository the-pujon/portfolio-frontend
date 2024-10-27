import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FontLoader from "@/components/shared/FontLoader";
import Providers from "@/lib/Provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Portfolio - Pujon",
  description: "Portfolio of Pujon Das Auvi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <FontLoader>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <Toaster position="top-right" />
      </FontLoader>

    </html>
  );
}
