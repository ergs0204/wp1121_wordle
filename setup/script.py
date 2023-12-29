import psycopg2
import os
import json

def resetcorpus(conn,cur):
    cur.execute("TRUNCATE TABLE  corpus CASCADE;")
    cur.execute("TRUNCATE TABLE  words CASCADE;")
    cur.execute("TRUNCATE TABLE  \"wordCorpusRelation\" CASCADE;")
    cur.execute("ALTER SEQUENCE corpus_id_seq RESTART WITH 1;")
    cur.execute("ALTER SEQUENCE words_id_seq RESTART WITH 1;")
    cur.execute("ALTER SEQUENCE \"wordCorpusRelation_id_seq\" RESTART WITH 1;")
    conn.commit()
    print("Done reset corpus/words/relations")

def show_table(tb):
    cur.execute("SELECT * FROM "+tb)
    users=cur.fetchall()
    print(tb.upper()+" Table")
    print(users)

def reset_table(tb):
    cur.execute(f"TRUNCATE TABLE  {tb} CASCADE;")
    cur.execute(f"ALTER SEQUENCE {tb}_id_seq RESTART WITH 1;")
    conn.commit()
    print(f"Done reset {tb}")

def addscore(user):
    cur.execute("INSERT INTO scores( userscore) VALUES('{}') RETURNING id;".format(corpusname))
    conn.commit()


# connect to db
conn = psycopg2.connect(database = "wordle", 
                        user = "postgres", 
                        host= 'localhost',
                        password = "postgres",
                        port = 5432)
cur = conn.cursor()

# resetcorpus()
reset_table("scores")
show_table("users")
show_table("scores")
show_table("games")