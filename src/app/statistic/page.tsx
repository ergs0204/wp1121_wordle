"use client"
import React from "react";
import { useRouter } from "next/navigation";

export default function Statistic (){
    const router = useRouter();

    // TODO: get personal statistic from api
    

    return (
        <div className="statistic">
            <button className="back" onClick={() => router.push("/")}>Home</button>
            <h1>Wordle Statistic</h1>
        </div>
    );
};