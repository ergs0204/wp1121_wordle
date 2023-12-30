import psycopg2
import os
import json
from tqdm import tqdm

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
conn = psycopg2.connect(database = "railway", 
                        user = "postgres", 
                        host= 'monorail.proxy.rlwy.net',
                        password = "GDe44FCFFgbge*BC6B231F34afgEBAEd",
                        port = 51216 )
cur = conn.cursor()
print("Connected")

# deletecorpus(conn,cur)

# get files
path=os.path.dirname(os.path.abspath(__file__))
res=[]
for file_path in os.listdir(path):
    # check if current file_path is a file
    if os.path.isfile(os.path.join(path, file_path)) and ".json" in file_path:
        # add filename to list
        res.append(file_path)

MAX_DEFINITION_LENGTH = 1000

for file in res:
    with open(path+"/"+file) as f:
        words = json.load(f)
    corpusname = file[:-5]
    print("Working on corpus : {}".format(corpusname))
    cur.execute("SELECT id FROM corpus WHERE corpus_name = %s;", (corpusname,))
    corpus_id = cur.fetchall()
    if not len(corpus_id):
        cur.execute("INSERT INTO corpus(corpus_name) VALUES(%s) RETURNING id;", (corpusname,))
        conn.commit()
        corpus_id = cur.fetchall()
    corpus_id = corpus_id[0][0]
    progress = tqdm(total=len(words))
    for word, definition in words.items():
        progress.update(1)
        truncated_definition = definition[:MAX_DEFINITION_LENGTH]
        cur.execute("SELECT id FROM words WHERE word = %s;", (word,))
        word_id = cur.fetchall()
        if not len(word_id):
            cur.execute("INSERT INTO words(word, definition) VALUES(%s, %s) RETURNING id;", (word,  truncated_definition))
            conn.commit()
            word_id = cur.fetchall()
        word_id = word_id[0][0]

        cur.execute("SELECT id FROM \"wordCorpusRelation\" WHERE corpus_id = %s AND word_id = %s;", (corpus_id, word_id))
        relation_id = cur.fetchall()
        if not len(relation_id):
            cur.execute("INSERT INTO \"wordCorpusRelation\"(corpus_id, word_id) VALUES(%s, %s) RETURNING id;", (corpus_id, word_id))
            conn.commit()
            relation_id = cur.fetchall()
        else:
            # print(f"Relation  {word} / {corpusname} already exist")
            pass
        relation_id = relation_id[0][0]
        if relation_id:
            # print(f"Successfully add {word} in {corpusname}")
            pass
        conn.commit()

print("Finish loading corpus")