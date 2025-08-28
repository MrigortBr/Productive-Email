from database import BaseModel, dataBase
from peewee import *
from datetime import datetime

class EmailModel(BaseModel):
    id = PrimaryKeyField()
    category = CharField()
    response = CharField()
    sender = CharField()
    receiver = CharField()
    file = CharField()
    title = CharField()
    message = CharField()
    created_at = DateTimeField(default=datetime.now)

    @classmethod
    def get_emails(cls):
        query = cls.select()
        
        return [
            {
                "id": email.id,
                "category": email.category,
                "response": email.response,
                "sender": email.sender,
                "receiver": email.receiver,
                "file": email.file,
                "title": email.title,
                "message": email.message,
                "created_at": email.created_at
            }
            for email in query
        ]


if dataBase.db.is_closed():
    dataBase.db.connect()
dataBase.db.create_tables([EmailModel])

