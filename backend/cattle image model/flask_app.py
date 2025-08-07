from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load the trained model
model = load_model("cattle_disease_model.h5")  # Ensure the .h5 file is in the same folder

# Map diseases to their remedies
disease_map = {
    0: {"name": "Anthrax disease", "remedy": "Use deep burial or burning of infected carcasses to prevent contamination.Improve pasture drainage to reduce spore survival.Use herbal immune boosters like garlic or turmeric in feed"},
    1: {"name": "Black leg disease", "remedy": "Feed immune-boosting herbs like neem and tulsi.Apply warm compresses to swollen areas to reduce inflammation.Ensure cattlegraze in dry,uncontaminated pastures.."},
    2: {"name": "Foot and mouth disease", "remedy": "Apply turmeric paste mixed with neem oil to ulcers for healing.Provide soft and easily digestible feed to reduce pain during eating.Disinfect the environment with lime powder to prevent further spread."},
    3: {"name": "Healthy", "remedy": "No Action Needed (ಯಾವುದೇ ಕ್ರಮ ಅಗತ್ಯವಿಲ್ಲ)"},
    4: {"name": "Johnes disease", "remedy": "Add probiotics (e.g., curd or yogurt) to feed to restore gut health.Feed high-fiber diets, including green grass and hay, to reduce symptoms.Use herbal supplements like aloe vera juice to soothe the digestive tract.."},
    5: {"name": "Lumpy skin disease", "remedy": "Apply neem leaf paste to the nodules to soothe and disinfect.Use turmeric and honey mixture to boost immunity.Bathe cattle with a solution of neem leaves to reduce skin irritation."},
    6: {"name": "Mastitis", "remedy": "Massage the udder with warm coconut oil infused with neem leaves.Apply a paste of turmeric and mustard oil to the affected area for antibacterial effects.Feed garlic or fenugreek seeds to enhance immunity."},
    7: {"name": "Rinderpest disease", "remedy": "Provide electrolyte solutions (salt and sugar in water) to combat dehydration.Add tulsi or holy basil to water for its antiviral properties.Ensure proper nutrition to boost immunity."},
    8: {"name": "Swollen joints", "remedy": "Apply a paste of turmeric and castor oil to reduce inflammation.Provide warm herbal baths with neem and tulsi extracts.Feed anti-inflammatory herbs like ginger in small amounts."},
    
    
    # Add more disease mappings as needed
}

@app.route("/predict", methods=["POST"])
def predict():
    # Check if an image is uploaded
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    # Save the uploaded image
    image_file = request.files["image"]
    image_path = "temp_image.jpg"
    image_file.save(image_path)

    # Preprocess the image
    img = load_img(image_path, target_size=(224, 224))  # Resize to match the model's input size
    img_array = img_to_array(img) / 255.0  # Normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    # Make prediction
    predictions = model.predict(img_array)
    disease_idx = np.argmax(predictions)  # Get the index of the highest confidence score
    confidence = float(np.max(predictions))  # Get the confidence score

    # Retrieve disease details
    disease_details = disease_map.get(disease_idx, {"name": "Unknown", "remedy": "Consult a veterinarian."})

    # Return the result
    return jsonify({
        "disease": disease_details["name"],
        "confidence": confidence,
        "remedy": disease_details["remedy"]
    })
# except Exception as e:
#         print(f"Error during prediction: {e}")
#         return jsonify({"error": "Failed to process the image. Please try again."}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5001,debug=True)
