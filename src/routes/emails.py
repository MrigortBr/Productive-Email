from flask import Blueprint, jsonify, request
from src.service.emailService import service
import os
from flask import abort
import time
from dotenv import load_dotenv

load_dotenv()

routes = Blueprint('routes', __name__)

@routes.route("/", methods=["GET"])
def listenApi():
    return "Api Running!"

@routes.route("/listen", methods=["GET"])
def getEmails():
    return {"status": 200, "message": "Emails listados!", "data": service.getEmails()}, 200

@routes.route("/upload", methods=["POST"])
def uploadEmail():
    
    SAVE_FILE = os.getenv("SAVE_FILE", "False").lower() in ("true", "1", "yes")

    if "file" not in request.files:
        return "Nenhum arquivo enviado", 400
    
    file = request.files["file"]

    if file.content_type != "text/plain" and file.content_type != "application/pdf":
        abort(406, description={"message": "Nesta rota são aceitos apenas .txt e .pdf!"})

    if file.filename == "":
        abort(406, description={"message": "Nome do arquivo inválido!"})
    
    os.makedirs('src/emails', exist_ok=True)

    if SAVE_FILE:
        src = f"src/emails/{int((time.time()) * 1000)}"
    else:
        src = "Não salvo!"

    data = service.loadEmail(file, src)

    if SAVE_FILE:
        file.seek(0)
        file.save(src)

    return {"status": 200, "message": "Upload realizado com sucesso!", "data": data.to_dict()}, 200

@routes.route("/newresponse", methods=["PATCH"])
def newResponse():
    data = request.get_json()

    if not data:
        abort(406, description={"message": "Nenhum dado enviado"})

    id = data.get("id")
    message = data.get("message")

    if not id or not message:
        abort(406, description={"message": "Campos obrigatórios faltando"})
    
    response = service.regenerateResponse(id, message)

    return {"status": 200, "message": "Nova resposta gerada!", "data": {"id": id, "message": response}}

@routes.route("/marksent/<int:email_id>", methods=["PATCH"])
def markSent(email_id):
    message = service.changStateEmail(email_id)
    return {"status": 200, "message": message, "data": email_id}