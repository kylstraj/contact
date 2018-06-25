import sys
import pymongo
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client.contactdb
collection = db[sys.argv[1]]

if __name__ == '__main__':
    collection.delete_many({})
