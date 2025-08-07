from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from your mobile/web app

# Load saved model, vectorizer, and label encoder
model = joblib.load("cattle_disease_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
label_encoder = joblib.load("label_encoder.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    symptoms = data.get("symptoms", "")

    if not symptoms.strip():
        return jsonify({"error": "No symptoms provided"}), 400

    input_vector = vectorizer.transform([symptoms])
    prediction = model.predict(input_vector)
    disease = label_encoder.inverse_transform(prediction)[0]

    return jsonify({"disease": disease})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000,debug=True)
