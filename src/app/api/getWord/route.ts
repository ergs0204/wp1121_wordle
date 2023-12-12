import { getFontDefinitionFromNetwork } from "next/dist/server/font-utils";
import { NextResponse, type NextRequest } from "next/server";

//import CryptoJS from "crypto-js";
import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { wordCorpusRelationTable, wordsTable } from "@/db/schema";
import type {} from "@/lib/types/type";

export async function GET(req: NextRequest) {
  try {
    console.log("Getting word");
    const corpusIdStr = req.nextUrl.searchParams.get("corpusId");
    if (!corpusIdStr) {
      return NextResponse.json(
        { error: "corpusId is required" },
        { status: 400 },
      );
    }
    const corpusId = corpusIdStr ? +corpusIdStr : 1;
    console.log(corpusId);
    // const randomWordId = await db
    //   .execute(sql`select wordId from ${wordCorpusRelationTable} where ${wordCorpusRelationTable.id} = ${corpusId} ORDER BY RANDOM () LIMIT 1`);
    const randomWordId = await db
      .select({ wordId: wordCorpusRelationTable.wordId })
      .from(wordCorpusRelationTable)
      .where(eq(wordCorpusRelationTable.corpusId, corpusId))
      .orderBy(sql`RANDOM()`)
      .limit(1);
    const randomWord = await db
      .select({
        word: wordsTable.word,
        definition: wordsTable.definition,
      })
      .from(wordsTable)
      .where(eq(wordsTable.id, randomWordId[0].wordId));
    return NextResponse.json({
      word: randomWord[0].word,
      definition: randomWord[0].definition,
    });
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
