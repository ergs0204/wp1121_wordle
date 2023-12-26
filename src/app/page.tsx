"use client"
import { AuthProvider } from "@/app/auth/AuthProvider";
import Homepage from "@/components/Homepage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./auth/page";
import Singleplayer from "./singlePlayer/page";
import Multiplayer from "./multiPlayer/page";
import Matchingroom from "./matchingRoom/page";
import Statistic from "./statistic/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthProvider>
        <Homepage />
      </AuthProvider>
    </main>
  );
}
