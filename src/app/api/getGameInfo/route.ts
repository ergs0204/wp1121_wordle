import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { guessesTable, wordsTable, gamesTable} from "@/db/schema";
import type {Guess} from "@/types";

export async function GET(req: NextRequest) {
  try {
    const gameId = req.nextUrl.searchParams.get('gameId');

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
    .leftjoin(wordsTable, eq(gamesTable.wordId, wordsTable.id))
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
      .leftjoin(wordsTable, eq(guessesTable.wordId, wordsTable.id))
      .where(eq(guessesTable.gameId, gameId))
      .execute();
    gameInfo[0].guesses = guesses as Guess[];

    return NextResponse.json(
        gameInfo[0],
      { status: 200 },
    );
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
