import React from "react";
import { SocketProvider } from "@/app/socket/SocketProvider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

import "./App.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordle",
  description: "WP112 project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketProvider>
          <SessionProvider>{children}</SessionProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
