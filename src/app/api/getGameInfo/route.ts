import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { guessesTable, wordsTable, gamesTable } from "@/db/schema";
import type { Guess, GameInfo } from "@/lib/types/type";

export async function GET(req: NextRequest) {
  try {
    const gameIdParam = req.nextUrl.searchParams.get("gameId");
    const gameId = gameIdParam ? parseInt(gameIdParam, 10) : null;

    if (!gameId) {
      return NextResponse.json({ error: "Invalid Game ID" }, { status: 400 });
    }

    const gameInfo = await db
      .select({
        gameId: gamesTable.id,
        userId: gamesTable.userId,
        word: wordsTable.word,
        corpusId: gamesTable.corpusId,
        startTime: gamesTable.startTime,
        endTime: gamesTable.endTime,
      })
      .from(gamesTable)
      .leftJoin(wordsTable, eq(gamesTable.wordId, wordsTable.id))
      .where(eq(gamesTable.id, gameId))
      .execute();
    if (gameInfo.length === 0) {
      return NextResponse.json({ error: "Game Not Found" }, { status: 404 });
    }
    const guesses = await db
      .select({
        word: wordsTable.word,
        timestamp: guessesTable.timestamp,
        turn: guessesTable.turn,
      })
      .from(guessesTable)
      .leftJoin(wordsTable, eq(guessesTable.wordId, wordsTable.id))
      .where(eq(guessesTable.gameId, gameId))
      .execute();
      const gameInfoWithGuesses: GameInfo = {
        ...gameInfo[0],
        word: gameInfo[0].word || "error",
        guesses: guesses as Guess[],
      };
      
    return NextResponse.json(gameInfoWithGuesses, { status: 200 });
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
