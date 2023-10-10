import pickle
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from sklearn.preprocessing import StandardScaler

app = FastAPI()

# Chargez le modèle depuis le fichier .pkl
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

with open('scaler.pkl', 'rb') as file:
    scaler = pickle.load(file)

# Classe Pydantic pour représenter les données d'entrée
class InputData(BaseModel):
    distance_from_home: float
    distance_from_last_transaction: float
    ratio_to_median_purchase_price: float
    repeat_retailer: float
    used_chip: float
    online_order: float

# Endpoint pour effectuer des prédictions
@app.post("/predict/")
def predict(data: InputData):
    # Créez un DataFrame à partir des données d'entrée
    input_data = pd.DataFrame({
        "distance_from_home": [data.distance_from_home],
        "distance_from_last_transaction": [data.distance_from_last_transaction],
        "ratio_to_median_purchase_price": [data.ratio_to_median_purchase_price],
        "repeat_retailer": [data.repeat_retailer],
        "used_chip": [data.used_chip],
        "online_order": [data.online_order]
    })

    scaled_data = scaler.transform(input_data.values)

    # Mettez à l'échelle les données d'entrée avec le même scaler utilisé lors de l'entraînement
    scaled_data_df = pd.DataFrame(scaled_data, index=input_data.index, columns=input_data.columns)

    # Effectuez la prédiction
    prediction = model.predict(scaled_data_df)

    # Renvoyez les prédictions sous forme de réponse
    return {"prediction": prediction[0]}
