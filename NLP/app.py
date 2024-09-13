from flask import Flask, request, render_template
import joblib

app = Flask(__name__)

# Load the model and vectorizer
model = joblib.load('finalized_model.sav')
vectorizer = joblib.load('vec.sav')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    text = request.form['text']
    X = vectorizer.transform([text])
    prediction = model.predict(X)
    return render_template('result.html', sentiment=prediction[0])

if __name__ == '__main__':
    app.run(debug=True)
