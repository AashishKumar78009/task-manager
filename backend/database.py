from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()  #Loads variables from `.env` into os.environ
client = MongoClient(os.getenv("MONGODB_URL"))
db = client[os.getenv("DB_NAME")]
contacts_collection = db["contacts"]
