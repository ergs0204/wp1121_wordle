import { and, eq } from "drizzle-orm";
import { db } from "@/db/index";
import { wordCorpusRelationTable, wordsTable } from "@/db/schema";
import fs from 'fs';
import path from 'path';

function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}

import s from './all.json';
const f = getFiles("./");

f.forEach(async (file) => {
  if (file.includes(".json")) {
    console.log(file);
    const words = await import(path.resolve(file));
    const corpusName = path.basename(file, ".json");
    console.log(words.default.slice(0, 5));
    console.log(corpusName);
  }
});
