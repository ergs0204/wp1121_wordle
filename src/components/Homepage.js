import React from "react";
import Footer from "./Footer";

export default function Homepage (){

    return (
        <div className="homepage">
            <h1 className="title">Wordle</h1>
            <button className="mode from-center" onClick={() => window.location.href="/newSgame"}>single player</button>
            <button className="mode from-center" onClick={() => window.location.href="/newMgame"}>multiplayer</button>
            <button className="mode from-center" onClick={() => window.location.href="/statistic"}>statistic</button>
            <button className="mode from-center" onClick={() => window.location.href="/auth"}>logout</button>
            <Footer />
        </div>
    );
};

