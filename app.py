from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from src.routes.emails import routes
from src.routes.pages import pages

app = Flask(__name__)
CORS(app)

app.register_blueprint(routes, url_prefix="/api")
app.register_blueprint(pages, url_prefix="/")

load_dotenv()

if __name__ == '__main__':
    app.run(port=os.getenv('API_PORT', 2000), debug=True)