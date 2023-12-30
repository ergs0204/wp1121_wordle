import React from "react";
import { useSession } from "next-auth/react";
// import { getScoreboard } from "../app/api/getScoreboard";

export default function Gamestat ({ gameInfos }){
    // const gameWord = gameInfos.word;
    // const gameTurn = gameInfos.guesses;
    // const startTime = gameInfos.startTime;
    // const endTime = gameInfos.endTime;
    // const gameTime = endTime - startTime;
    const { data: session } = useSession();
    if(gameInfos){
        gameInfos.map((gameInfo) => {
            console.log(gameInfo);
        });
    }

    return (
        <div className="gamestat">
            <p className="user">Player:{session.user.username}</p>
            <div className="game">
                <div className="word">word</div>
                <div className="turn">turn</div>
                <div className="time">time</div>
            </div>
        </div>
    );
};