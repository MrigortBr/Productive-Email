from src.database.database import BaseModel, dataBase
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
    sent = BooleanField(default=False)
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
                "created_at": email.created_at,
                "sent": email.sent
            }
            for email in query
        ]
    
    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "response": self.response,
            "sender": self.sender,
            "receiver": self.receiver,
            "title": self.title,
            "message": self.message,
            "created_at": self.created_at,
            "sent": self.sent
        }
    
    @staticmethod
    def email_dict_to_dto(email_dict):
        return {
            "id": email_dict["id"],
            "sender": email_dict["sender"],
            "receiver": email_dict["receiver"],
            "title": email_dict["title"],
            "message": email_dict["message"],
            "category": email_dict["category"],
            "response": email_dict["response"],
            "sent": email_dict["sent"],
            "created_at": email_dict["created_at"].isoformat()  # se precisar
        }



if dataBase.db.is_closed():
    dataBase.db.connect()
dataBase.db.create_tables([EmailModel])

