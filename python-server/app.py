from flask import Flask, render_template, request
from flask_cors import *
import openai

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app, supports_credentials=True)  # 设置全体跨域
openai.api_key = "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"


@app.route('/')
def index():
    return render_template('index.html')
    # return app.send_static_file('index.html')


@app.route('/chat', methods=['POST'])
def chat():
    text = request.json.get('text')
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": text}]
    )
    # print(response)
    answer = response.choices[0].message['content']
    print(text)
    print(answer)
    # print(message)
    return answer


@app.route('/get', methods=['GET'])
def get():
    return f'got'


@app.route('/cross')
@cross_origin(supports_credentials=True)  # 设置单条 api 跨域
def hello_pycharm():
    return f'Hello, PyCharm!'


@app.route('/hello')
def hello_world():
    return 'Hello Flask!'


if __name__ == '__main__':
    # 默认为5000端口
    app.run()
    # app.run(port=8000)
