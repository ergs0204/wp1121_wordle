import psycopg2
import os
import json
from tqdm import tqdm
import concurrent
import concurrent.futures
from env import database,user,host,password,port

def commit_word(progress,word,definition):
    # print("Working on word",word)
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
    # print("finish word: ",word)
    progress.update(1)

# connect to db
conn = psycopg2.connect(database = database, 
                        user = user, 
                        host= host,
                        password = password,
                        port = port)
cur = conn.cursor()
print("Connected")

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

    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor: # optimally defined number of threads
        res = [executor.submit(commit_word,progress, word, definition) for word, definition in words.items()]
        concurrent.futures.wait(res)
    # for word, definition in words.items():
    #     progress.update(1)
    #     # asyncio.create_task(call_postgres_function(word,definition))
    #     truncated_definition = definition[:MAX_DEFINITION_LENGTH]
    #     cur.execute("SELECT id FROM words WHERE word = %s;", (word,))
    #     word_id = cur.fetchall()
    #     if not len(word_id):
    #         cur.execute("INSERT INTO words(word, definition) VALUES(%s, %s) RETURNING id;", (word,  truncated_definition))
    #         conn.commit()
    #         word_id = cur.fetchall()
    #     word_id = word_id[0][0]

    #     cur.execute("SELECT id FROM \"wordCorpusRelation\" WHERE corpus_id = %s AND word_id = %s;", (corpus_id, word_id))
    #     relation_id = cur.fetchall()
    #     if not len(relation_id):
    #         cur.execute("INSERT INTO \"wordCorpusRelation\"(corpus_id, word_id) VALUES(%s, %s) RETURNING id;", (corpus_id, word_id))
    #         conn.commit()
    #         relation_id = cur.fetchall()
    #     else:
    #         # print(f"Relation  {word} / {corpusname} already exist")
    #         pass
    #     relation_id = relation_id[0][0]
    #     if relation_id:
    #         # print(f"Successfully add {word} in {corpusname}")
    #         pass
    #     conn.commit()

print("Finish loading corpus")