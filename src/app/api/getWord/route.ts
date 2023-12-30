import { getFontDefinitionFromNetwork } from "next/dist/server/font-utils";
import { NextResponse, type NextRequest } from "next/server";

import { and, eq, sql, inArray } from "drizzle-orm";

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
    // console.log("id",randomWordId)
    const randomWord = await db
      .select({
        word: wordsTable.word,
        definition: wordsTable.definition,
      })
      .from(wordsTable)
      .where(eq(wordsTable.id, randomWordId[0].wordId));
    console.log(randomWord)
    const allWordsId = await db
      .select({ wordId: wordCorpusRelationTable.wordId })
      .from(wordCorpusRelationTable)
      .where(eq(wordCorpusRelationTable.corpusId, corpusId));
    const ids = allWordsId.map((x) => x.wordId);
    // console.log(ids)
    const allWords = await db
      .select({
        word: wordsTable.word,
      })
      .from(wordsTable)
      .where(inArray(wordsTable.id, ids));
    const words = allWords.map((x) => x.word);
    // console.log(allWords)
    return NextResponse.json({
      word: randomWord[0].word,
      definition: randomWord[0].definition,
      allWords: words,
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