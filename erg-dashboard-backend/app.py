# Code base from: https://stackoverflow.com/questions/44371041/python-socketio-and-flask-how-to-stop-a-loop-in-a-background-thread

from flask import Flask
from flask_socketio import SocketIO

import sys

import odrive

from stat_worker import StatWorker
from control_worker import ControlWorker


app = Flask(__name__, static_folder='../erg-dashboard-frontend/build', static_url_path='/')
app.config['SECRET_KEY'] = "geowang"

socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins='*')
print("Searching for odrive...")
odrv0 = odrive.find_any()
if odrv0:
    print(f"Odrive found! SN: {odrv0.serial_number}")
    statWorker = StatWorker(socketio, odrv0)
    controlWorker = ControlWorker(socketio, odrv0)
else:
    print("Odrive not found!", file=sys.stderr)


@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    print("Starting server...")
    socketio.run(app, host="0.0.0.0", port=80, debug=False)
