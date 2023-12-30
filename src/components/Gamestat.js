import React from "react";
import { useSession } from "next-auth/react";
// import { getScoreboard } from "../app/api/getScoreboard";

export default function Gamestat ({ gameInfos }){
    const { data: session } = useSession();


    return (
        <div className="gamestat">
            <p className="user">Player:{session.user.username}</p>

        </div>
    );
};