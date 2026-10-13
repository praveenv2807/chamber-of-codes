// @ts-ignore
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chamber of Codes | CSE - KSR College of Engineering",
  description: "Gamified C Operator Arena with Harry Potter Dark Magic Theme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
