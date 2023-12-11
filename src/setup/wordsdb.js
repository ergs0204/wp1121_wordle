import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import {wordCorpusRelationTable, wordsTable} from "@/db/schema";

const fs = require('fs')
const path = require('path');
function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir)
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files)
    } else {
      // If it is a file, push the full path to the files array
      files.push(name)
    }
  }
  return files
}

var s = require('./all.json');
f=getFiles("./");

for (let i = 0; i < f.length; i++){
	if (f[i].includes(".json")){
		console.log(f[i])
		const words=require(f[i])
		const corpusName= path.basename(f[i],".json")
		console.log(words.slice(0,5))
		console.log(corpusName)


	}

}

