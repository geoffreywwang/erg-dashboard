from flask import Flask
from flask_socketio import SocketIO
import odrive

app = Flask(__name__)
app.config['SECRET_KEY'] = 'geowang'
socketio = SocketIO(app)

if __name__ == '__main__':
    socketio.run(app, port=5001)

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

