"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Gamestat from "@/components/Gamestat";

export default function Statistic (){
    const router = useRouter();

    // TODO: get personal statistic from api
    const user = "user";
    

    return (
        <div className="statistic">
            <button className="back" onClick={() => router.push("/")}>Home</button>
            <h1>Wordle Statistic</h1>
            <p>Player: user</p>
            <div>
                <h2>Single Player</h2>
                <Gamestat user={user}/>
            </div>
        </div>
    );
};