from flask import Flask
from flask import render_template
from flask import request

from google import genai
from PIL import Image

app = Flask(__name__)
client = genai.Client(api_key="GEMINI API KEY HERE")

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/processImage", methods=['POST'])
def processImage():
   print("PROCESSING")
   image = Image.open(request.files["file"].stream);
   response = client.models.generate_content(
       model="gemini-2.0-flash",
       contents=[image, "Tell what this image says"]
   )

   return response.text

