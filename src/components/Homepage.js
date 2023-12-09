import React from "react";
import Footer from "./Footer";
import {useState} from "react";

export default function Homepage ({homepage, setHomepage}){

    const handleSinglePlayer = () => {
        setHomepage(false);
    };
    const handleMultiplayer = () => {
        setHomepage(false);
    };

    return (
        <div className="homepage">
            <h1>Wordle</h1>
            <button className="mode from-center" onClick={() => handleSinglePlayer}>single player</button>
            <button className="mode from-center" onClick={() => handleMultiplayer}>multiplayer</button>
            <Footer />
        </div>
    );
};

