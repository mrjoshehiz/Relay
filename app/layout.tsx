import type { Metadata, Viewport } from "next";
import "./globals.css";
import { RelayNotifications } from "@/components/relay-notifications";

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#ffffff', colorScheme: 'light', interactiveWidget: 'resizes-content' };

export const metadata: Metadata = {
  title: "Relay | Your delivery, under control",
  description: "Book a delivery, follow your parcel, and get a little help from Relay. A premium delivery app preview.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}<RelayNotifications /></body>
    </html>
  );
}
