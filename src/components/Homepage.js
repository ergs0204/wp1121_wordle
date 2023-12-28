import React from "react";
import Footer from "./Footer";
import {useRouter} from "next/navigation";

export default function Homepage (){
    const router = useRouter();
    // HttpSession session = request.getSession();
    // session.setAttribute("user", user);
    // User user = (User) session.getAttribute("user");
    // if (user == null) {
    //     // user is not logged in, redirect to login page
    //     response.sendRedirect(request.getContextPath() + "/auth");
    //     return;
    // }
    const handleLogout = () => {
        // HttpSession session = request.getSession();
        // session.invalidate();
        // response.sendRedirect(request.getContextPath() + "/auth");
        router.push("/auth")
    }

    return (
        <div className="homepage">
            <h1 className="title">Wordle</h1>
            <button className="mode from-center" onClick={() => router.push("/singlePlayer")}>single player</button>
            <button className="mode from-center" onClick={() => router.push("/matchingRoom")}>multiplayer</button>
            <button className="mode from-center" onClick={() => router.push("/statistic")}>statistic</button>
            <button className="mode from-center" onClick={ handleLogout }>logout</button>
            <Footer />
        </div>
    );
};

