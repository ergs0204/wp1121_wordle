import {
  index,
  pgTable,
  serial,
  uuid,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

// Checkout the many-to-many relationship in the following tutorial:
// https://orm.drizzle.team/docs/rqb#many-to-many

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);
// scores Table
export const scoresTable = pgTable(
  "scores",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    score: integer("score").default(0),
  }
);

// words table
export const wordsTable = pgTable(
  "words",
  {
    id: serial("id").primaryKey(),
    word:varchar("word", { length: 100 }).unique(),
  }
)

// corpus table
export const corpusTable = pgTable(
  "corpus",
  {
    id: serial("id").primaryKey(),
    corpusName:varchar("corpus_name", { length: 100 }).unique(),
  }
)
// word corpus relation table
export const wordCorpusRelationTable = pgTable(
  "wordCorpusRelation",
  {
    id: serial("id").primaryKey(),
    wordId: serial("word_id")
      .notNull()
      .references(() => wordsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    corpusId: serial("corpus_id")
    .notNull()
    .references(() => corpusTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  }
)
// games table
export const gamesTable = pgTable(
  "games",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    wordId: serial("word_id")
    .notNull()
    .references(() => wordsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    corpusId: serial("corpus_id")
    .notNull()
    .references(() => corpusTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    startTime: timestamp("start_time").notnull(),
    endTime: timestamp("end_time").notnull(),
  },
);

// guesses table
export const guessesTable = pgTable(
  "guesses",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    gameId: serial("game_id")
    .notNull()
    .references(() => gamesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    wordId: serial("word_id")
    .notNull()
    .references(() => wordsTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    turn: integer("turn").notnull(),
    timestamp: timestamp("timestmp").notnull(),

  },
);

/*
// secretTable
export const secretTable = pgTable(
  "secret",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    gameId: serial("game_id")
    .notNull()
    .references(() => gamesTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    timestamp: timestamp("timestmp").notnull(),

  },
);
*/