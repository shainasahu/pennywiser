from flask import Flask, jsonify, request
from flask_cors import CORS
from google import genai
import os

app = Flask(__name__)
CORS(app)  # allow Next.js frontend to access backend

os.environ["GEMINI_API_KEY"] = "AIzaSyArNynHncEWxWrx8tS9aAinzU1P7T-lsYY"
client = genai.Client()

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
        # response.text contains the generated reply
        return jsonify({"response": response.text})
    except Exception as e:
        print("Chat API error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/nessie", methods=["POST"])
def nessie():
    # Nessie API - Capital One
    
    # load_dotenv()
    
    customerId = '12'
    apiKey = os.getenv("NESSIE_API_KEY")
    print(apiKey)
    
    url = 'http://api.nessieisreal.com//accounts/{id}/purchases?key={}'.format(customerId,apiKey)
    print(url)
    
    # get /accounts/{id}/purchases
    response = requests.get(url)
    
    if response.status_code == 201:
    	print('Response received')
    
    # within responses get description and amount
    purchases = response.json()
    print(purchases)    
    for purchase in purchases:
        description = purchase['description']
        amount = purchase['amount']
    
    # Later, you can load it back
    # from joblib import load
    
    loaded_pipeline = load('ridge_pipeline.joblib')
    
    # Predict for a single row — keep 2D shape
    single_row = [description, amount]   # note the double brackets
    y_pred = loaded_pipeline.predict(single_row)
    print("Prediction for row 0:", y_pred)
    print("Actual value:", y.iloc[0])
    converted_value = y_pred[0] * (850 - 300) + 300
    print("Converted to original scale (Credit score):", converted_value)

if __name__ == "__main__":
    app.run(port=8000, debug=True)
