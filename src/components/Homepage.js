"use client"
import React from "react";
import Footer from "./Footer";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function Homepage() {
    const router = useRouter();
    const { data: session } = useSession();
    const handleLogout = () => {
        // session = request.getSession();
        // session.invalidate();
        // response.sendRedirect(request.getContextPath() + "/auth");
        router.push("/auth/signout")
    }
    return (
        <div className="homepage">
            
            {session ? (
                <h3>Welcome, {session.user.username}!</h3>
            ) : (
                <h3>You are not logged in.</h3>
            )}
            <h1 className="title">Wordle</h1>
            <div>
            </div>
            <button className="mode from-center" onClick={() => router.push('/singlePlayer')}>single player</button>
            <button className="mode from-center" onClick={() => router.push('/matchingRoom')}>multiplayer</button>
            <button className="mode from-center" onClick={() => router.push('/statistic')}>statistic</button>
            <button className="mode from-center" onClick={ handleLogout }>logout</button>
            <Footer />
        </div>
    );
}