import React from "react";
import Footer from "./Footer";

export default function Homepage (){

    return (
        <div className="homepage">
            <h1 className="title">Wordle</h1>
            <button className="mode from-center"><a href="/newSgame">single player</a></button>
            <button className="mode from-center"><a href="/newMgame">multiplayer</a></button>
            <button className="mode from-center"><a href="/statistic">statistic</a></button>
            <button className="mode from-center"><a href="/auth">logout</a></button>
            <Footer />
        </div>
    );
};

