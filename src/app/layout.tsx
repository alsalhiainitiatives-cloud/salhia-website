import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const thmanyah = localFont({
  variable: "--font-thmanyah",
  display: "swap",
  src: [
    { path: "../fonts/ths-Regular.woff2", weight: "400" },
    { path: "../fonts/ths-Medium.woff2", weight: "500" },
    { path: "../fonts/ths-Bold.woff2", weight: "700" },
  ],
});

export const metadata: Metadata = {
  title: { default: "الجمعية الأهلية الصالحية بعنيزة", template: "%s | الجمعية الأهلية الصالحية" },
  description: "منصة الجمعية الأهلية الصالحية بعنيزة: المبادرات والدورات والحوكمة والإعلام.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={thmanyah.variable}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
