import React from "react";

export default function Homepage (homepage, setHomepage){
    const handleSinglePlayer = () => {
        setHomepage(false);
    };
    const handleMultiplayer = () => {
        setHomepage(false);
    };

    return (
        <div className="grid">
            <h1>
                Wordle
            </h1>
            <button class="mode" className="flex" onClick={() => handleSinglePlayer}>single player</button>
            <button class="mode" className="flex" onClick={() => handleMultiplayer}>multiplayer</button>
        </div>
    );
};

