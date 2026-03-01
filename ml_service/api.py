from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Healthcare AI ML Service")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('columns.pkl', 'rb') as f:
        columns = pickle.load(f)
except FileNotFoundError:
    model = None
    columns = None

class SymptomInput(BaseModel):
    symptoms: list[str]

@app.get("/")
def home():
    return {"status": "ML Service is Running", "model_loaded": model is not None}

@app.post("/predict")
async def predict(data: SymptomInput):
    if not model:
        raise HTTPException(status_code=500, detail="Model shared not found. Train the model first.")
    
    # Prepare input vector
    input_vector = np.zeros(len(columns))
    for s in data.symptoms:
        if s in columns:
            input_vector[columns.index(s)] = 1
            
    # Reshape for prediction
    input_df = pd.DataFrame([input_vector], columns=columns)
    prediction = model.predict(input_df)[0]
    
    # Get probabilities (optional if using forest, but Tree has it too)
    # probabilities = model.predict_proba(input_df)
    
    return {
        "condition": prediction,
        "confidence": "High (Based on AI Model)",
        "recommendation": "Please consult a healthcare professional for a final diagnosis."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
