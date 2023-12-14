import { NextResponse, type NextRequest } from "next/server";

import { eq, desc } from "drizzle-orm";

import { db } from "@/db";
import { scoresTable, gamesTable, guessesTable, wordsTable } from "@/db/schema";
import type { UserInfo, GameInfo, Guess } from "@/lib/types/type";

export async function GET(req: NextRequest) {
  try {
    const topScores = await db
      .select({
        userId: scoresTable.userId,
        score: scoresTable.score,
      })
      .from(scoresTable)
      .orderBy(desc(scoresTable.score))
      .limit(10)
      .execute();

    const userInfos: UserInfo[] = [];

    for (const { userId, score } of topScores) {
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
        .where(eq(gamesTable.userId, userId))
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
            gameId: game.gameId,
            userId: userId,
            word: game.word || "error",
            corpusId: game.corpusId,
            startTime: game.startTime,
            endTime: game.endTime,
            guesses: guesses as Guess[],
          };
        }),
      );

      userInfos.push({
        userId: userId,
        score: score ? score : 0,
        games: gameInfos,
      });
    }
    return NextResponse.json(userInfos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
