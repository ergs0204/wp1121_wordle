"use client"
import React from "react";
import Footer from "./Footer";
import { useRouter } from 'next/navigation';

export default function Homepage() {
    const router = useRouter();
    console.log("");
    return (
        <div className="homepage">
            <h1 className="title">Wordle</h1>
            <button className="mode from-center" onClick={() => router.push('/singlePlayer')}>single player</button>
            <button className="mode from-center" onClick={() => router.push('/matchingRoom')}>multiplayer</button>
            <button className="mode from-center" onClick={() => router.push('/statistic')}>statistic</button>
            <button className="mode from-center" onClick={() => router.push('/auth')}>logout</button>
            <Footer />
        </div>
    );
}
