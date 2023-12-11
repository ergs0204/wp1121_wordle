import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { gamesTable, guessesTable, scoresTable, wordsTable } from "@/db/schema";
import type { GameInfo, Guess } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const gameInfo: GameInfo = await req.json();

    const wordRecord = await db
      .select({
        id: wordsTable.id,
      })
      .from(wordsTable)
      .where(eq(wordsTable.word, gameInfo.word))
      .execute();

    if (wordRecord.length === 0) {
      return NextResponse.json({ error: "Word not found" }, { status: 404 });
    }
    /*
    // check answer
    const valid = await db
    .select({
      id: wordsTable.id,
    })
    .from(secretTable)
    .where(and(
      eq(secretTable.word, gameInfo.word),
      eq(secretTable.userId,gameInfo.userId),
      eq(secretTable.gameId,gameInfo.gameId)
      ))
    .execute();
    if (!valid) {
      return NextResponse.json({ message: "Wrong answer" }, { status: 200 });
    }
    */
    const wordId = wordRecord[0].id;
    const insertedGame = await db
      .insertInto(gamesTable)
      .values({
        userId: gameInfo.userId,
        wordId: wordId,
        corpusId: gameInfo.corpusId,
        startTime: gameInfo.startTime,
        endTime: gameInfo.endTime,
      })
      .returning('*')
      .execute();

    for (const guess of gameInfo.
         es) {
      const guessWordRecord = await db
        .select({
          id: wordsTable.id,
        })
        .from(wordsTable)
        .where(eq(wordsTable.word, guess.word))
        .execute();

      if (guessWordRecord.length === 0) {
        continue; 
      }
      const guessWordId = guessWordRecord[0].id;

      await db
        .insertInto(guessesTable)
        .values({
          gameId: insertedGame[0].id,
          wordId: guessWordId,
          timestamp: guess.timestamp,
          turn: guess.turn,
        })
        .execute();
    }

    await db
      .update(scoresTable)
      .set({
        score: scoresTable.score + 1,
      })
      .where(eq(scoresTable.userId, gameInfo.userId))
      .execute();

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
