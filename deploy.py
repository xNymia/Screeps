from pathlib import Path
import os, glob, re, requests, json, sys
from time import sleep
from configparser import ConfigParser
from pprint import pprint

def cleanDir():
    print(" ==> Clearing ./dist/ \n")
    dist = glob.glob("./dist/*")
    for file in dist:
        print(" Delete: " + file)
        os.remove(file)
    
    sleep(2)
  
def stageAndRewrite():
    os.chdir('src')
    print("\n ==> Staging files \n ")

    for file in Path('.').rglob('*.js'):

        out = '../dist/'+file.name
        w = open(out, 'a')

        print(" Moving: " + str(file) + " ==> " + out)    
    
        with file.open() as f:
            for line in f.readlines():

                if ('require' in line) and ('lodash' not in line) :
                    result = re.search(r"require\('(.+\/+(.+))'\)", line)
                    w.write(line.replace(result.group(1), result.group(2)))
                else:
                    w.write(line)
        f.close()
        w.close()

def buildAndPush(config, mode):

    url = config.get(mode, 'url')
    user = config.get(mode, 'user')
    password = config.get(mode, 'pass')
    branch = config.get(mode, 'branch')
    headers = {'Content-Type': 'application/json; charset=utf-8'}
    modules = {}

    print("\n ==> Building Deploy \n")

    os.chdir('../dist')
    for file in Path('.').rglob('*.js'):
        with file.open() as f:
            print(" Staging: " + file.name)
            modules[file.name.replace('.js','')] = f.read()

    data = {
        'branch':branch,
        'modules':modules
    }

    resp = requests.Request('POST', url, headers=headers, json=data, auth=(user, password))
    prep = resp.prepare()

    print("\n ==> Pushing To Server: " +env+"\n")
       
    s = requests.Session()
    resp = s.send(prep)

    print(" Response: "+str(resp.status_code)+" \n ")

config = ConfigParser()
config.read('secrets.ini')
env = sys.argv[1]

if env == 'clean':
    cleanDir()
    exit()
else:

    cleanDir()
    stageAndRewrite()
    buildAndPush(config, env)
    exit()







