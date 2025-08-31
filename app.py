from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from src.routes.emails import routes
from src.routes.pages import pages

app = Flask(__name__)
CORS(app)

@app.errorhandler(400)
@app.errorhandler(404)
@app.errorhandler(406)
@app.errorhandler(500)
def handle_error(e):
    response = {
        "status": e.code if hasattr(e, "code") else 500,
        "error": e.description if hasattr(e, "description") else str(e)
    }
    return jsonify(response), response["status"]

app.register_blueprint(routes, url_prefix="/api")
app.register_blueprint(pages, url_prefix="/")

load_dotenv()

if __name__ == '__main__':
    app.run(port=os.getenv('API_PORT', 2000), debug=True)