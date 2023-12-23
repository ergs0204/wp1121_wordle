import React from "react";
import Footer from "./Footer";

export default function Homepage (){

    // HttpSession session = request.getSession();
    // session.setAttribute("user", user);
    // User user = (User) session.getAttribute("user");
    // if (user == null) {
    //     // user is not logged in, redirect to login page
    //     response.sendRedirect(request.getContextPath() + "/auth");
    //     return;
    // }

    return (
        <div className="homepage">
            <h1 className="title">Wordle</h1>
            <button className="mode from-center" onClick={() => window.location.href="/newSgame"}>single player</button>
            <button className="mode from-center" onClick={() => window.location.href="/matchingroom"}>multiplayer</button>
            <button className="mode from-center" onClick={() => window.location.href="/statistic"}>statistic</button>
            <button className="mode from-center" onClick={() => window.location.href="/auth"}>logout</button>
            <Footer />
        </div>
    );
};

