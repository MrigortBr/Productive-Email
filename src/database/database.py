
import os
from peewee import *
from dotenv import load_dotenv

load_dotenv()

class DataBase:
    def __init__(self):
        self.__databaseType = os.getenv('DATABASE_TYPE')
        self.initDataBase()

    def initDataBase(self):
        if (self.__databaseType == "sqlite"):
            self.generateSqlite()
        elif(self.__databaseType == "mysql"):
            self.generateMysql()
        elif(self.__databaseType == "postgresql"):
            self.generatePostgres()
        else:
            raise ValueError(f"Tipo de banco desconhecido: {self.__databaseType} \nTipos Aceitos: \n-sqlite \n-mysql \n-postgresql")

    def generateSqlite(self):
        os.makedirs('./database', exist_ok=True)
        self.db = SqliteDatabase('./database/database.db')
    
    def generateMysql(self):
        self.db = PostgresqlDatabase(
            os.getenv('DATABASE_DB'),
            user=os.getenv('DATABASE_USER'),
            password=os.getenv('DATABASE_PASSWORD'),
            host=os.getenv('DATABASE_HOST'),
            port=int(os.getenv('DATABASE_PORT', 3306))
        )

    def generatePostgres(self):
        self.db = PostgresqlDatabase(
            os.getenv('DATABASE_DB'),
            user=os.getenv('DATABASE_USER'),
            password=os.getenv('DATABASE_PASSWORD'),
            host=os.getenv('DATABASE_HOST'),
            port=int(os.getenv('DATABASE_PORT', 5432))
        )

dataBase = DataBase()

class BaseModel(Model):
    class Meta:
        database = dataBase.db