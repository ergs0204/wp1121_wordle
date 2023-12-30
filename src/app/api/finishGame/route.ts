import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { gamesTable, guessesTable, scoresTable, wordsTable } from "@/db/schema";
import type { GameInfo, Guess } from "@/lib/types/type";


const gameInfoSchema = z.object({
  // userId: z.string(),
  word: z.string().min(1).max(50),
  corpusId: z.number(),
  startTime: z.string().transform((str) => new Date(str)),
  endTime: z.string().transform((str) => new Date(str)),
  guesses: z.object({
    word: z.string().min(1).max(50),
    timestamp: z.string().transform((str) => new Date(str)),
    turn: z.number().min(1).max(10),
  }).array(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const gameInfo = await req.json();
  try {
    console.log("--------------------------------------")
    console.log("gameInfo :",gameInfo)
    gameInfoSchema.parse(gameInfo);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  try {
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
      eq(secretTable.userId,userId),
      eq(secretTable.gameId,gameInfo.gameId)
      ))
    .execute();
    if (!valid) {
      return NextResponse.json({ message: "Wrong answer" }, { status: 200 });
    }
    */
    
    const wordId = wordRecord[0].id;
    const insertedGame = await db
      .insert(gamesTable)
      .values({
        userId: userId,
        wordId: wordId,
        corpusId: gameInfo.corpusId,
        startTime: new Date(gameInfo.startTime),
        endTime: new Date(gameInfo.endTime),
      })
      .returning();
    for (const guess of gameInfo.guesses) {
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
        .insert(guessesTable)
        .values({
          gameId: insertedGame[0].id,
          userId: userId,
          wordId: guessWordId,
          timestamp: new Date(guess.timestamp),
          turn: guess.turn,
        })
        .execute();
    }

    const currentScoreRecord = await db
      .select()
      .from(scoresTable)
      .where(eq(scoresTable.userId, userId))
      .execute();
    
    console.log("scoreRecord",currentScoreRecord );
    // console.log("!score",!currentScoreRecord.length );
    if (!currentScoreRecord.length){
      console.log("adding user to score table")
      await db
        .insert(scoresTable)
        .values({
          userId:userId,
        })
        .returning();
      const currentScore = 0;
      console.log("currentScore in add",currentScore)
    }else{
      const currentScore = currentScoreRecord[0].score;
      console.log("currentScore in alr",currentScore)
    }
    // TODO : currentScore not define from above (above console.log is ok)
    console.log("currentScorerecord",currentScoreRecord)
    const currentScore = currentScoreRecord[0].score;
    console.log("currentScore",currentScore)
    await db
        .update(scoresTable)
        .set({
          score: currentScore?currentScore + 1:0,
        })
        .where(eq(scoresTable.userId, userId))
        .execute();
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}