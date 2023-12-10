import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { scoresTable, guessesTable, wordsTable, gamesTable } from "@/db/schema";
import type { Guess, GameInfo } from "@/types";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: string;
    };
  },
) {
  try {
    
    const score = await db
    .select({
      score: scoresTable.score,
    })
    .from(scoresTable)
    .where(eq(scoresTable.userId, params.userId))
    .limit(1)
    .execute();
    
    if (!score){
       return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    const gameInfos = await db
    .select({
      gameId: gamesTable.id,
      userId: params.userId,
      word: wordsTable.word,
      corpusId: gamesTable.corpusId,
      startTime: gamesTable.startTime,
      endTime: gamesTable.endTime,
    })
    .from(gamesTable)
    .leftjoin(wordsTable, eq(gamesTable.wordId, wordsTable.id))
    .where(eq(gamesTable.userId, params.userId))
    .execute();
    
    for (let game of gameInfos) {
      const guesses = await db
        .select({
          word: wordsTable.word,
          timestamp: guessesTable.timestamp,
          turn: guessesTable.turn,
        })
        .from(guessesTable)
        .leftjoin(wordsTable, eq(guessesTable.wordId, wordsTable.id))
        .where(eq(guessesTable.gameId, game.gameId))
        .execute();

      game.guesses = guesses as Guess[];
    }
    
    return NextResponse.json(
      {
        userId: params.userId,
        score: score[0]?.score || 0,
        games: gameInfos as GameInfo[],
      },
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
