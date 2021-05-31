from flask_socketio import SocketIO, emit
import eventlet

import odrive
from odrive.enums import *

from datetime import datetime

class StatWorker(object):
    def __init__(self, socketio, odrv0):
        self.socketio = socketio
        self.odrv0 = odrv0
        self.isRunning = False

        self.socketio.on_event('startStats', self.start_stats)
        self.socketio.on_event('stopStats', self.stop_stats)

        print("Initialized StatWorker!")

    def do_work(self):
        self.isRunning = True
        while self.isRunning:
            stats = {
                'time': datetime.now().timestamp() * 1000,
                'velocity': self.odrv0.axis1.encoder.vel_estimate,
                'torque': self.odrv0.axis1.motor.current_control.Iq_measured,
                'voltage': self.odrv0.vbus_voltage,
                'current': self.odrv0.ibus
            }
            # stats = {
            #     'time': datetime.now().timestamp() * 1000,
            #     'velocity': 5,
            #     'torque': 4,
            #     'voltage': 2
            # }
            self.socketio.emit('stats', stats)
            eventlet.sleep(0.03)

    def stop(self):
        self.isRunning = False

    def start_stats(self):
        if self.isRunning == False:
            self.socketio.start_background_task(target=self.do_work)

    def stop_stats(self):
        self.stop()