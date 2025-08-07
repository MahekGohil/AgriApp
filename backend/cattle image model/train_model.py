from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam


dataset_path = "dataset/"  

# Image preprocessing
datagen = ImageDataGenerator(
    rescale=1.0/255,          
    validation_split=0.2      
)

# Load training and validation data
train_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),   
    batch_size=32,
    subset="training"
)
val_data = datagen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),
    batch_size=32,
    subset="validation"
)

# Load MobileNetV2 (pre-trained model)
base_model = MobileNetV2(weights="imagenet", include_top=False)
x = base_model.output
x = GlobalAveragePooling2D()(x)  # Reduce dimensions while preserving features
x = Dense(128, activation="relu")(x)
predictions = Dense(train_data.num_classes, activation="softmax")(x)

model = Model(inputs=base_model.input, outputs=predictions)

for layer in base_model.layers:
    layer.trainable = False

model.compile(optimizer=Adam(learning_rate=0.0001),
              loss="categorical_crossentropy",
              metrics=["accuracy"])

model.fit(
    train_data,
    validation_data=val_data,
    epochs=10,
    verbose=1
)


model.save("cattle_disease_model.h5")
print("Model saved as cattle_disease_model.h5")
