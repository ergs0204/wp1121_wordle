import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { scoresTable, guessesTable, wordsTable, gamesTable } from "@/db/schema";
import type { Guess, GameInfo } from "@/lib/types/type";

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
    const scoreRecord = await db
      .select({
        score: scoresTable.score,
      })
      .from(scoresTable)
      .where(eq(scoresTable.userId, params.userId))
      .limit(1)
      .execute();

    if (scoreRecord.length === 0) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    const games = await db
      .select({
        gameId: gamesTable.id,
        word: wordsTable.word,
        corpusId: gamesTable.corpusId,
        startTime: gamesTable.startTime,
        endTime: gamesTable.endTime,
      })
      .from(gamesTable)
      .leftJoin(wordsTable, eq(gamesTable.wordId, wordsTable.id))
      .where(eq(gamesTable.userId, params.userId))
      .execute();

    const gameInfos: GameInfo[] = await Promise.all(
      games.map(async (game) => {
        const guesses = await db
          .select({
            word: wordsTable.word,
            timestamp: guessesTable.timestamp,
            turn: guessesTable.turn,
          })
          .from(guessesTable)
          .leftJoin(wordsTable, eq(guessesTable.wordId, wordsTable.id))
          .where(eq(guessesTable.gameId, game.gameId))
          .execute();

        return {
          ...game,
          word: game.word ? game.word : "error",
          userId: params.userId,
          guesses: guesses as Guess[],
        };
      }),
    );

    return NextResponse.json(
      {
        userId: params.userId,
        score: scoreRecord[0].score,
        games: gameInfos,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
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
