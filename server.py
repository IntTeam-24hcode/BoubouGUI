from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/output', methods = ['POST'])
def get_post_javascript_data():
    jsdata = request.data
    exec(jsdata)
    return "{'statut': 'OK'}", 201

if __name__ == "__main__":
	app.run()
