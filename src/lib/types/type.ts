export type GameInfo = {
  userId: string,
  word: string,
  corpusId: number,
  startTime: Date,
  endTime: Date,
  guesses: Guess[],
}

export type Guess = {
  word: string,
  timestamp: Date,
  turn: number,
}

export type UserInfo={
  userId:string,
  score: number,
  games:GameInfo[],
}