import { NextResponse, type NextRequest } from "next/server";
//import CryptoJS from "crypto-js";

import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import {wordCorpusRelationTable, wordsTable} from "@/db/schema";
import type {} from "@/types";

export async function GET() {
  try {
    const corpusId = req.nextUrl.searchParams.get('corpusId');
    const randomWordId = await db
      .select("wordId")
      .from(wordCorpusRelationTable)
      .where(eq(wordCorpusRelationTable.corpusId, corpusId))
      .orderBy("random()")
      .fetchOne();
    const randomWord = await db
      .select("word")
      .from(wordsTable)
      .where({ randomWordId });
    /*
    
    const secret= (()=> {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let counter = 0;
      while (counter < 6) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        counter += 1;
      }
      return "CTF{"+result;
    })();
    // add userid/gameid/ans to secretTable DNF
     await db
      .insertInto(secretTable)
      .values({
        userId: gameInfo.userId,
        wordId: wordId,
        corpusId: gameInfo.corpusId,
        startTime: gameInfo.startTime,
        endTime: gameInfo.endTime,
      })
      .execute();
    
    const data = CryptoJS.AES.encrypt(
      secret,
      randomWord
    ).toString();
    return NextResponse.json(data);
    */
    return NextResponse.json(randomWord);
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
