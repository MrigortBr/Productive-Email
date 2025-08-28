from flask import Blueprint, render_template

pages = Blueprint('pages', __name__)

@pages.route("/", methods=["GET"])
def sendHome():
    return render_template("index.html")
