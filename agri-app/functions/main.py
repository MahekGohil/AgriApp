import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend/backend communication

# Load the TFLite model
interpreter = tf.lite.Interpreter(model_path="Plant_Disease.tflite")
interpreter.allocate_tensors()

# Get model input/output details
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Manually define the class names (as per the classes your model was trained with)
class_names = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",
    "Potato__Early_blight",
    "Potato__Late_blight",
    "Potato__healthy",
    "Tomato_Bacterial_spot",
    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot",
    "Tomato_Spider_mites_Two_spotted_spider_mite",
    "Tomato_Target_Spot",
    "Tomato_Tomato_YellowLeaf_Curl_Virus",
    "Tomato_Tomato_mosaic_virus",
    "Tomato_healthy"
]

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "Model is running"}), 200

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]

    # Optional: check for valid image type
    if file.mimetype not in ["image/jpeg", "image/png"]:
        return jsonify({"error": "Unsupported file type"}), 400

    try:
        # Step 1: Read and preprocess image
        img = Image.open(io.BytesIO(file.read())).resize((224, 224)).convert("RGB")
        img_array = np.array(img).astype(np.float32) / 255.0  # normalize
        input_data = np.expand_dims(img_array, axis=0)

        # Step 2: Run inference
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])

        # Step 3: Interpret results
        predicted_index = int(np.argmax(output_data))
        confidence = float(output_data[0][predicted_index])
        predicted_label = class_names[predicted_index]

        return jsonify({
            "disease": predicted_label,
            "confidence": round(confidence * 100, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("Model expects input shape:", input_details[0]['shape'])
    print("Class names:", class_names)  # Print class names to verify
    app.run(debug=True, host='0.0.0.0', port=5002)
