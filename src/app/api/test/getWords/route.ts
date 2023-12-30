import { NextResponse, type NextRequest } from "next/server";


import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import {wordCorpusRelationTable, wordsTable} from "@/db/schema";

export async function GET() {
  console.log("Getting words")
  try {
    console.log("Getting words")
    return NextResponse.json("hi");
    const words = await db
      .select("*")
      .from(wordsTable);

    return NextResponse.json(words);
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
