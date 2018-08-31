const config = require('../../config/serial.js');

var SerialPort = require('serialport');

var serialPort = {
  port: null,

  getMicrocontrollerPort: function() {
    return new Promise(async function(resolve, reject) {
      const availablePorts = await SerialPort.list();
      const wemosPorts = availablePorts.filter(function(currentPort) {
        return currentPort.vendorId == WEMOS_VENDOR_ID;
      });

      if (wemosPorts.length > 0) {
        resolve(wemosPorts[0].comName);
      } else {
        reject(new Error("no wemos found"));
      }
    });
  },
  
  registerMesa: function(data) {
    return new Promise(function(resolve, reject) {
      const wemosPort = await this.getMicrocontrollerPort();
      await this.openPort(wemosPort);
      await this.flush();
      this.port.on('data', function (data) {
        console.log('data Data:', data);
        resolve('port written' + data);
      });
      await this.write('mesa#;wifi-network;wifi-password;mqttserverip;mqttport;mqttusername;mqttkey\n');
    });
  },

  openPort: function(comName) {
    return new Promise(async function(resolve, reject) {
      
      this.port = new SerialPort(comName, { 
        autoOpen: false, 
        baudRate: 9600, 
      }).setEncoding('ascii');
  
  
      this.port.open(function (err) {
          if (err) {
             console.log('Error opening port: ', err.message);
             reject(err);
          }
          // Because there's no callback to write, write errors will be emitted on the port:
          // port.write('main screen turn on');
          console.log('port opened');
          // registerModule(port);
          resolve(this.port);
        });
    });
  },

  flush: function() {
    return new Promise(function (resolve, reject) {
      this.port.flush(function flushDone(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.port);
        }
      });
    });
  },

  write: function(writeValue) {
    return new Promise(function(resolve, reject) {
      this.port.write(writeValue, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.port);
          }
        });
    });
  },

  read: function (callback) {
    port.on('data', function (data) {
      callback(data);
    });
  }
};

module.exports = serialPort;