import pandas as pd
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib


df = pd.read_csv("expanded_cattle_diseases_dataset.csv")
print("📄 Loaded dataset with shape:", df.shape)

df = df[["Symptoms", "Disease"]]
df.dropna(subset=["Symptoms", "Disease"], inplace=True)
df["Symptoms"] = df["Symptoms"].astype(str).str.strip()
df = df[df["Symptoms"].str.len() > 0]
print("✅ After cleaning:", df.shape)


print("Unique diseases before cleaning:", df["Disease"].unique())


df["Disease"] = df["Disease"].str.strip()
df = df[df["Disease"].notna()]


print("Unique diseases after cleaning:", df["Disease"].unique())


X_raw = df["Symptoms"]
y_raw = df["Disease"]

#  Vectorize text
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(X_raw)

# Encode labels
label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y_raw)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)


model = RandomForestClassifier(n_estimators=150, random_state=42, class_weight='balanced')
model.fit(X_train, y_train)


cv_splits = min(5, len(set(y))) 
print(f"Using {cv_splits} splits for cross-validation.")
cv = StratifiedKFold(n_splits=cv_splits, shuffle=True, random_state=42)
cv_scores = cross_val_score(model, X, y, cv=cv, scoring='accuracy')
print(f"\n🎯 Cross-validation accuracy: {cv_scores.mean():.2f} ± {cv_scores.std():.2f}")


y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"\n🎯 Accuracy on test set: {accuracy:.2%}")

print("\n📊 Classification Report:\n")
print(classification_report(y_test, y_pred, labels=range(len(label_encoder.classes_)),
                            target_names=label_encoder.classes_, zero_division=0))

joblib.dump(model, "cattle_disease_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")
print("\n✅ Model, vectorizer, and label encoder saved successfully!")
