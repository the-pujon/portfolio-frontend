import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import FontLoader from "@/components/shared/FontLoader";

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
          <Navbar />
          {children}
          <Footer />
        </FontLoader>

    </html>
  );
}
