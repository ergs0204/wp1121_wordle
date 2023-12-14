import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { gamesTable, guessesTable, scoresTable, wordsTable } from "@/db/schema";
import type { GameInfo, Guess } from "@/lib/types/type";

export async function GET() {
  try {
    console.log("success");
    return NextResponse.json("Success!");
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
