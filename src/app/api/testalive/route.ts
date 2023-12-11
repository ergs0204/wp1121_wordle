import { NextResponse, type NextRequest } from "next/server";
//import CryptoJS from "crypto-js";

import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import {wordCorpusRelationTable, wordsTable} from "@/db/schema";
import type {} from "@/types";

export async function GET() {
  try {
    console.log("success")
    return NextResponse.json("Success");
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
