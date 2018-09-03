const config = require('../../config/serial.js');
var SerialPort = require('serialport');

const DATA_END_LINE = "\0";

var serialPort = {
  port: null,

  writeRegistrationData: function(data) {
    return new Promise(async (resolve, reject) => {
      const wemosPort = await this.getMicrocontrollerPort();    
      console.log('wemos port = ', wemosPort);
      await this.openPort(wemosPort);
      await this.flush();
      
      // register the read callback to receive the confirmation from the uC
      this.port.on('data', async (data) => {
        console.log('data Data:', data);
        await this.port.close();
        if (data == '1') {
          resolve('module configured');
        } else {
          reject('module not configured');
        }
      });
      await this.write(this.buildData(data));
    });
  },

  getMicrocontrollerPort: function() {
    return new Promise(async function(resolve, reject) {
      const availablePorts = await SerialPort.list();
      const wemosPorts = availablePorts.filter(function(currentPort) {
        return currentPort.vendorId == config.WEMOS_VENDOR_ID;
      });

      if (wemosPorts.length > 0) {
        resolve(wemosPorts[0].comName);
      } else {
        reject(new Error("no wemos found"));
      }
    });
  },
  
  openPort: function(comName) {
    return new Promise(async (resolve, reject) => {
      
      this.port = new SerialPort(comName, { 
        autoOpen: false, 
        baudRate: 9600, 
      }).setEncoding('ascii');
  
  
      this.port.open((err) => {
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
    return new Promise((resolve, reject) => {
      this.port.flush((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.port);
        }
      });
    });
  },

  write: function(writeValue) {
    return new Promise((resolve, reject) => {
      this.port.write(writeValue, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.port);
          }
        });
    });
  },

  read: function(callback) {
    port.on('data', function (data) {
      callback(data);
    });
  },

  buildData: function (data) {
    console.log('stringifyed data = ', JSON.stringify(data));
    return JSON.stringify(data) + DATA_END_LINE;
  }
};

module.exports = serialPort;