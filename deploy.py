from pathlib import Path
import os, glob, re, requests, json
from time import sleep
from configparser import ConfigParser
from pprint import pprint

config = ConfigParser()
config.read('secrets.ini')

url = config.get('main', 'url')
user = config.get('main', 'user')
password = config.get('main', 'pass')

print(" ==> Clearing ./dist/ \n")

dist = glob.glob("./dist/*")
for file in dist:
    print(" Delete: " + file)
    os.remove(file)
    
sleep(2)

os.chdir('src')
print("\n ==> Staging files \n ")

for file in Path('.').rglob('*.js'):

    out = '../dist/'+file.name
    w = open(out, 'a')

    print("Moving: " + str(file) + " ==> " + out)    
 
    with file.open() as f:
        for line in f.readlines():

            if line.startswith('require'):
                
                result = re.search(r"require\('(.+\/+(.+))'\)", line)
                w.write(line.replace(result.group(1), result.group(2)))
            else:
                w.write(line)
    f.close()
    w.close()



headers = {'Content-Type': 'application/json; charset=utf-8'}

os.chdir('../dist')

modules = {}

for file in Path('.').rglob('*.js'):
    with file.open() as f:
        modules[file.name.replace('.js','')] = f.read()

data = {
    'branch':'default',
    'modules':modules
}

resp = requests.Request('POST', url, headers=headers, json=data, auth=(user, password))
prep = resp.prepare()


s = requests.Session()
resp = s.send(prep)
print(resp)


