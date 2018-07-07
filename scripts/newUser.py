import pymongo
import bcrypt
import base64
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client.contactdb
users = db.users

if __name__ == "__main__":
    print("Username: ")
    username = input()
    print("Password: ")
    password = input()
    print("Name: ")
    name = input()
    print("Email: ")
    email = input()
    print("Phone: ")
    phone = input()
    print("Address: ")
    address = input()
    user = {"fullName": name,
            "email": email,
            "phone": phone,
            "address": address,
            "username": username,
            "passwordHash": bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())}
    users.insert_one(user)
