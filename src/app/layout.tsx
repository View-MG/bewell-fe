import type { Metadata } from "next";
import { figTree } from "@/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Navbar } from "@/_layouts/Navbar";

export const metadata: Metadata = {
  title: "Bewell Website",
  description: "The place to buy health products",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", figTree.className)}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
