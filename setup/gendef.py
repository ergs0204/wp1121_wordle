import json
from wordhoard import Definitions
import os

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
	print(words)
	for word in words:
		definition = Definitions(search_string=word).find_definitions()[-1]
		print(word,":",definition)
		words[word]=definition
	print(words)
	# with open(path+"/"+file, 'w') as f:
	# 	json.dump(words, f)