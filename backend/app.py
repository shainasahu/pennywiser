from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)  # allow Next.js frontend to access backend

os.environ["GEMINI_API_KEY"] = "AIzaSyArNynHncEWxWrx8tS9aAinzU1P7T-lsYY"
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

@app.route("/api/categories")
def get_categories():
    categories = [
        {"name": "Groceries", "budget": 300, "spent": 100},
        {"name": "Food & Takeout", "budget": 150, "spent": 10},
        {"name": "Shopping", "budget": 200, "spent": 17},
        {"name": "Entertainment", "budget": 100, "spent": 50},
        {"name": "Rent", "budget": 800, "spent": 800}
    ]
    return jsonify(categories)

@app.route("/api/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    context = request.json.get("context", "")

    # Combine user message with context
    prompt = f"{context}\nUser: {user_message}\nAssistant:"

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000, debug=True)
