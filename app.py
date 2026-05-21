from flask import Flask, render_template, request
import tensorflow as tf
import numpy as np
import os
import os
import gdown

MODEL_PATH = "model.h5"

if not os.path.exists(MODEL_PATH):
    url = "https://drive.google.com/uc?id=1KX9azzxejuryVzpxm0883Fs2S_8HwtG9"
    gdown.download(url, MODEL_PATH, quiet=False)

from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder='Static', template_folder='Templates')

UPLOAD_FOLDER = "Static/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Load model
model = tf.keras.models.load_model("model.h5")

# Label kelas
class_names = [
    "botol_bir",
    "botol_plastik",
    "buku",
    "kaleng",
    "kardus",
    "koran",
    "pipa_pvc",
    "plastik_kresek"
]


# =========================
# HOME
# =========================

@app.route("/")
def index():
    return render_template("index.html")


# =========================
# PREDICT
# =========================

@app.route("/predict", methods=["POST"])
def predict():

    if "file" not in request.files:
        return "File tidak ditemukan"

    file = request.files["file"]

    if file.filename == "":
        return "File belum dipilih"

    filename = secure_filename(file.filename)

    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        filename
    )

    file.save(filepath)

    # Preprocessing gambar
    img = image.load_img(
        filepath,
        target_size=(224, 224)
    )

    img_array = image.img_to_array(img)

    img_array = img_array / 255.0

    img_array = np.expand_dims(img_array, axis=0)

    # Prediksi
    prediction = model.predict(img_array)


    predicted_class_raw = class_names[np.argmax(prediction)]
    predicted_class = predicted_class_raw.replace('_', ' ').title()


    confidence = np.max(prediction) * 100



    return render_template(
        "result.html",
        prediction=predicted_class,
        confidence=round(float(confidence), 2),
        image_path=f"uploads/{filename}"
    )




# =========================
# RUN
# =========================

if __name__ == "__main__":
    app.run(debug=True)