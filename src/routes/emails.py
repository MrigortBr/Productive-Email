from flask import Blueprint, jsonify, request
from src.service.emailService import service

routes = Blueprint('routes', __name__)



@routes.route("/", methods=["GET"])
def listenApi():
    return "Api Running!"

@routes.route("/listen", methods=["GET"])
def getEmails():
    return service.getEmails()

@routes.route("/upload", methods=["POST"])
def uploadEmail():
    if "file" not in request.files:
        return "Nenhum arquivo enviado", 400
    
    file = request.files["file"]

    if file.content_type != "text/plain" and file.content_type != "application/pdf":
        return "Nesta rota são aceitos apenas .txt e .pdf", 400

    if file.filename == "":
        return "Nome do arquivo inválido", 400
    
    src = f"emails/{file.filename}"

    service.loadEmail(file, src)
    file.seek(0)
    file.save(src)

    return f"Arquivo {file.filename} recebido!"  


@routes.route("/newresponse", methods=["POST"])
def newResponse():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Nenhum dado enviado"}), 400

    id = data.get("id")
    message = data.get("message")

    if not id or not message:
        return jsonify({"error": "Campos obrigatórios faltando"}), 400
    
    response = service.regenerateResponse(id, message)

    return jsonify({"success": True, "id": id, "message": response})

