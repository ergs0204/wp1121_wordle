import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { scoresTable, gamesTable, guessesTable, wordsTable } from "@/db/schema";
import type { UserInfo, GameInfo, Guess } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const topScores = await db
      .select({
        userId: scoresTable.userId,
        score: scoresTable.score,
      })
      .from(scoresTable)
      .orderBy({ score: "desc" })
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
        .leftjoin(wordsTable, eq(gamesTable.wordId, wordsTable.id))
        .where(eq(gamesTable.userId, userId))
        .execute();

      for (const game of games) {
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

      userInfos.push({
        userId,
        score,
        games: games as GameInfo[],
      });
    }

    return NextResponse.json(userInfos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
