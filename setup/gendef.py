import json
import requests
import os
from tqdm import tqdm

path=os.path.dirname(os.path.abspath(__file__))
res=[]
for file_path in os.listdir(path):
	# check if current file_path is a file
	if os.path.isfile(os.path.join(path, file_path)) and ".json" in file_path:
		# add filename to list
		res.append(file_path)

print(res)
for file in res:
	with open(path+"/"+file) as f:
		words = json.load(f)
	progress = tqdm(total=len(words))
	for word in words.keys():
		progress.update(1)
		if words[word]!="":
			continue
		r=requests.get("https://api.dictionaryapi.dev/api/v2/entries/en/"+word).text
		if "No Definitions Found" in r:
			print("No definition :",word)
			continue
		else:
			# print("Working on :",word)
			pass
		r=json.loads(r)[0]
		definitionText = ""
		# print(r["meanings"])
		for meaning in  r["meanings"]:
			# print("a mean",meaning)
			definitionText+=meaning["partOfSpeech"]+". "
			for definition in meaning["definitions"]:
				definitionText+=definition["definition"]+" "
			definitionText+="\n"
		# print(word,":",definitionText)
		words[word]=definitionText
		
	# print(words[:10])
	# break
	with open(path+"/new"+file, 'w') as f:
		json.dump(words, f ,indent=3)