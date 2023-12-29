"use client"
import React from "react";
import Footer from "./Footer";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function Homepage() {
    const router = useRouter();
    const { data: session } = useSession();
    const handleLogout = () => {
        // HttpSession session = request.getSession();
        // session.invalidate();
        // response.sendRedirect(request.getContextPath() + "/auth");
        router.push("/auth")
    }
    return (
        <div className="homepage">
            
            <h1 className="title">Wordle</h1>
            <div>
            {session ? (
                <h3>Welcome, {session.user.username}!</h3>
            ) : (
                <h3>You are not logged in.</h3>
            )}
            </div>
            <button className="mode from-center" onClick={() => router.push('/singlePlayer')}>single player</button>
            <button className="mode from-center" onClick={() => router.push('/matchingRoom')}>multiplayer</button>
            <button className="mode from-center" onClick={() => router.push('/statistic')}>statistic</button>
            <button className="mode from-center" onClick={ handleLogout }>logout</button>
            <Footer />
        </div>
    );
}
