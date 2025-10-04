from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow Next.js frontend to access backend

@app.route("/api/categories")
def get_categories():
    categories = [
        {"name": "Groceries", "budget": 300, "spent": 250},
        {"name": "Food & Takeout", "budget": 150, "spent": 180},
        {"name": "Rent", "budget": 800, "spent": 800},
        {"name": "Shopping", "budget": 200, "spent": 100},
        {"name": "Entertainment", "budget": 100, "spent": 50}
    ]
    return jsonify(categories)

if __name__ == "__main__":
    app.run(port=8000, debug=True)
