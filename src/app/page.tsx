"use client";

import { AuthProvider } from "@/app/auth/AuthProvider";
import { SocketProvider } from "@/app/socket/SocketProvider";
import Homepage from "@/components/Homepage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthProvider>
          <Homepage />
      </AuthProvider>
    </main>
  );
}
