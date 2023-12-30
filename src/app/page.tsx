"use client";

import { AuthProvider } from "@/app/auth/AuthProvider";
import Homepage from "@/components/Homepage";
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/auth');
    }
  }, [session, router]);
  if (!session) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthProvider>
          <Homepage />
      </AuthProvider>
    </main>
  );
}
