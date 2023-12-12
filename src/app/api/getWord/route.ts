import { NextResponse, type NextRequest } from "next/server";

//import CryptoJS from "crypto-js";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { wordCorpusRelationTable, wordsTable } from "@/db/schema";
import type {} from "@/lib/types/type";

export async function GET(req) {
  try {
    console.log("Getting word");
    const corpusId = req.nextUrl.searchParams.get("corpusId");
    console.log(corpusId);
    if (!corpusId) {
      return NextResponse.json(
        { error: "corpusId is required" },
        { status: 400 },
      );
    }
    const randomWordId = await db
      .select({ wordId: wordCorpusRelationTable.wordId })
      .from(wordCorpusRelationTable)
      .where(eq(wordCorpusRelationTable.corpusId, corpusId))
      .orderBy("random()")
      .fetchOne();
    const randomWord = await db
      .select("word")
      .from(wordsTable)
      .where({ randomWordId });
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
