# Code base from: https://stackoverflow.com/questions/44371041/python-socketio-and-flask-how-to-stop-a-loop-in-a-background-thread

from flask import Flask
from flask_socketio import SocketIO, emit
import eventlet

import sys

import odrive
from odrive.enums import *

from stat_worker import StatWorker
from control_worker import ControlWorker


app = Flask(__name__)
app.config['SECRET_KEY'] = "geowang"

socketio = SocketIO(app, async_mode='eventlet', cors_allowed_origins='*')
print("Searching for odrive...")
odrv0 = odrive.find_any()
if odrv0:
    print(f"Odrive found! SN: {odrv0.serial_number}")
else:
    sys.exit("Odrive not found!")
    pass

statWorker = StatWorker(socketio, odrv0)
controlWorker = ControlWorker(socketio, odrv0)

if __name__ == '__main__':
    print("Starting server...")
    socketio.run(app, host="localhost", port=5000, debug=False)