import pymongo
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client.contactdb
users = db.users

if __name__ == "__main__":
    print("First name: ")
    firstName = input()
    print("Last name: ")
    lastName = input()
    print("Email: ")
    email = input()
    print("Phone: ")
    phone = input()
    print("Address: ")
    address = input()
    user = {"firstName": firstName,
            "lastName": lastName,
            "email": email,
            "phone": phone,
            "address": address}
    users.insert_one(user)
