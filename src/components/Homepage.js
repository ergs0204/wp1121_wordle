import React from "react";
import Footer from "./Footer";

export default function Homepage ({setPage}){

    const handleSinglePlayer = () => {
        setPage("singlePlayer");
    };
    const handleMultiplayer = () => {
        setPage("multiPlayer");
    };
    const handleStatistic = () => {
        setPage("statistic");
    };
    const handleLogout = () => {
        setPage("login");
    };

    return (
        <div className="homepage">
            <h1 className="title">Wordle</h1>
            <button className="mode from-center" onClick={handleSinglePlayer}>single player</button>
            <button className="mode from-center" onClick={handleMultiplayer}>multiplayer</button>
            <button className="mode from-center" onClick={handleStatistic}>statistic</button>
            <button className="mode from-center" onClick={handleLogout}>logout</button>
            <Footer />
        </div>
    );
};

