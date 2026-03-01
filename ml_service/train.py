import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
import pickle
import os

# 📂 Dataset: Symptoms mapping to conditions
# 1 = symptom present, 0 = absent
data = {
    'itching': [1,0,0,1,1,0,0,0,0,0],
    'skin_rash': [1,1,1,1,0,0,0,0,0,0],
    'continuous_sneezing': [0,0,0,0,1,1,0,0,0,0],
    'shivering': [0,0,0,0,1,1,0,0,0,0],
    'stomach_pain': [0,0,0,0,0,0,1,1,0,0],
    'acidity': [0,0,0,0,0,0,1,1,0,0],
    'vomiting': [0,0,0,1,0,1,0,1,1,1],
    'fatigue': [0,1,1,0,0,0,0,0,1,1],
    'weight_loss': [0,0,1,0,0,0,0,0,0,0],
    'cough': [0,0,0,0,0,1,0,0,1,1],
    'high_fever': [0,0,0,1,0,1,0,0,1,1],
    'headache': [0,0,1,0,0,1,0,1,1,0],
    'chest_pain': [0,0,0,0,0,0,0,1,1,1],
    # Target Disease
    'prognosis': [
        'Fungal infection', 'Allergy', 'Diabetes', 'Drug Reaction', 
        'Common Cold', 'Pneumonia', 'GERD', 'Gastritis', 
        'Tuberculosis', 'Bronchitis'
    ]
}

def train_model():
    df = pd.DataFrame(data)
    X = df.drop('prognosis', axis=1)
    y = df['prognosis']
    
    model = DecisionTreeClassifier()
    model.fit(X, y)
    
    # Save model and columns
    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)
    with open('columns.pkl', 'wb') as f:
        pickle.dump(list(X.columns), f)
    
    print("✅ ML Model trained and saved successfully!")

if __name__ == "__main__":
    train_model()
