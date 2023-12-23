"use client"
import React from "react";
import Footer from "./Footer";
import { useRouter } from 'next/navigation';

export default function Homepage() {
    const router = useRouter();

    return (
        <div className="homepage">
            <h1 className="title">Wordle</h1>
            <button className="mode from-center" onClick={() => router.push('/newSgame')}>single player</button>
            <button className="mode from-center" onClick={() => router.push('/matchingroom')}>multiplayer</button>
            <button className="mode from-center" onClick={() => router.push('/statistic')}>statistic</button>
            <button className="mode from-center" onClick={() => router.push('/auth')}>logout</button>
            <Footer />
        </div>
    );
}
