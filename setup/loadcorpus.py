import psycopg2
import os
import json

def deletecorpus(conn,cur):
    cur.execute("TRUNCATE TABLE  corpus CASCADE;")
    cur.execute("TRUNCATE TABLE  words CASCADE;")
    cur.execute("TRUNCATE TABLE  \"wordCorpusRelation\" CASCADE;")
    cur.execute("ALTER SEQUENCE corpus_id_seq RESTART WITH 1;")
    cur.execute("ALTER SEQUENCE words_id_seq RESTART WITH 1;")
    cur.execute("ALTER SEQUENCE \"wordCorpusRelation_id_seq\" RESTART WITH 1;")
    conn.commit()
    print("deleted all")


# connect to db
conn = psycopg2.connect(database = "wordle", 
                        user = "postgres", 
                        host= 'localhost',
                        password = "postgres",
                        port = 5432)
cur = conn.cursor()

# deletecorpus(conn,cur)

# get files
path=os.path.dirname(os.path.abspath(__file__))
res=[]
for file_path in os.listdir(path):
    # check if current file_path is a file
    if os.path.isfile(os.path.join(path, file_path)) and ".json" in file_path:
        # add filename to list
        res.append(file_path)

for file in res:
    f = open(path+"/"+file)
    words = json.load(f)
    corpusname=file[:-5]
    print("Working on corpus : {}".format(corpusname))
    cur.execute("SELECT id FROM corpus WHERE corpus_name = '{}';".format(corpusname))
    corpus_id=cur.fetchall()
    if (not len(corpus_id)):
        cur.execute("INSERT INTO corpus( corpus_name) VALUES('{}') RETURNING id;".format(corpusname))
        conn.commit()
        corpus_id=cur.fetchall()
    corpus_id=corpus_id[0][0]
    for word in words:
        cur.execute("SELECT id FROM words WHERE word = '{}';".format(word))
        word_id=cur.fetchall()
        if (not len(word_id)):
            cur.execute("INSERT INTO words( word,definition) VALUES('{}','{}') RETURNING id;".format(word,words[word]))
            conn.commit()
            word_id=cur.fetchall()
        word_id=word_id[0][0]

        cur.execute("SELECT id FROM \"wordCorpusRelation\" WHERE corpus_id = '{}' AND word_id = '{}';".format(corpus_id,word_id))
        relation_id=cur.fetchall()
        if (not len(relation_id)):
            cur.execute("INSERT INTO \"wordCorpusRelation\"( corpus_id,word_id) VALUES('{}','{}') RETURNING id;".format(corpus_id,word_id))
            conn.commit()
            relation_id=cur.fetchall()
        else:
            # print(f"Relation  {word} / {corpusname} already exist")
            pass
        relation_id=relation_id[0][0]
        if relation_id:
            # print(f"Successfully add {word} in {corpusname}")
            pass
        conn.commit()

print("Finish loading corpus")
