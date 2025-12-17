from flask import Flask
from flask_cors import CORS
import os

from db import init_db
from routes.stream_routes import streams_bp
from routes.session_routes import sessions_bp
from routes.model_routes import models_bp

def create_app():
    # Define the path to the frontend build directory
    # In Docker/Production, this will likely be adjacent or specific
    # We will assume 'static_folder' points to where we copy the build
    dist_folder = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
    app = Flask(__name__, static_folder=dist_folder, static_url_path="/")

    CORS(app, resources={r"/*": {"origins": "*"}})

    @app.route("/", defaults={'path': ''})
    @app.route("/<path:path>")
    def catch_all(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return app.send_static_file(path)
        return app.send_static_file("index.html")

    # Ensure uploads dir exists
    os.makedirs(os.path.join(os.path.dirname(__file__), "uploads"), exist_ok=True)

    # Init SQLite
    init_db()

    # Blueprints
    app.register_blueprint(streams_bp, url_prefix="/streams")
    app.register_blueprint(sessions_bp, url_prefix="/")
    app.register_blueprint(models_bp, url_prefix="/")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
