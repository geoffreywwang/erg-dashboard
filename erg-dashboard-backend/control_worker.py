import eventlet

from odrive.utils import *


class ControlWorker(object):
    def __init__(self, socketio, odrv0):
        self.socketio = socketio
        self.odrv0 = odrv0
        self.isRunning = False
        
        self.torque_return = -0.15
        self.torque_resistance = 0
        self.resistance_constant = 3e-4

        self.odrv0.axis1.controller.input_torque = 0
        self.odrv0.axis1.controller.config.vel_limit = 80
        self.odrv0.axis1.motor.config.current_lim = 50
        self.limit_torque = self.odrv0.axis1.motor.config.current_lim * odrv0.axis1.motor.config.torque_constant * 0.75

        self.socketio.on_event('idle', self.set_idle)
        self.socketio.on_event('closedLoop', self.set_closed_loop)
        self.socketio.on_event('clearErrors', self.clear_errors)

        print("Initialized ControlWorker!")

    def do_work(self):
        self.isRunning = True
        while self.isRunning:
            # Read velocity
            temp_velocity = self.odrv0.axis1.encoder.vel_estimate

            # If velocity is positive (user is pulling)
            if temp_velocity > 0:
                # t = -C*v^2
                self.torque_resistance = -self.resistance_constant * (temp_velocity ** 2)
            else:
                self.torque_resistance = 0

            command_torque = max(-self.limit_torque, self.torque_return + self.torque_resistance)
            print(command_torque)
            self.odrv0.axis1.controller.input_torque = command_torque

            eventlet.sleep(0.001)
        self.odrv0.axis1.controller.input_torque = 0

    def stop(self):
        self.isRunning = False

    def set_idle(self):
        self.odrv0.axis1.requested_state = AXIS_STATE_IDLE
        self.stop()
        print("Odrive: Idle")

    def set_closed_loop(self):
        self.odrv0.axis1.requested_state = AXIS_STATE_CLOSED_LOOP_CONTROL
        if not self.isRunning:
            self.socketio.start_background_task(target=self.do_work)
        print('Odrive: Closed loop')
    
    def clear_errors(self):
        self.odrv0.axis1.error = 0
        print('Odrive: Cleared errors')
