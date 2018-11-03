'use strict';

class SW10 {

  constructor(options) {
    const i2c = require('i2c-bus');

    this.i2cBusNo = (options && options.hasOwnProperty('i2cBusNo')) ? options.i2cBusNo : 1;    
    this.i2cBus = i2c.openSync(this.i2cBusNo);
    this.i2cAddress = (options && options.hasOwnProperty('i2cAddress')) ? options.i2cAddress : SW10.LM75_DEFAULT_I2C_ADDRESS();

    this.I2C_ADDRESS     = 0x48;
    this.CHIP_ID         = 0x58;

    this.LM75B_REG_CONF = 0x01;
    this.LM75B_REG_TEMP = 0x00;
    this.LM75B_REG_TOS = 0x03;
    this.LM75B_REG_THYST = 0x02;
  }

  init() {
  }

  readSensorData() {
    return new Promise((resolve, reject) => {
      if(!this.cal) {
        return reject('You must first call sw10.init()');
      }

      // Grab temperature, humidity, and pressure in a single read
      //
      this.i2cBus.readI2cBlock(this.i2cAddress, this.LM75B_REG_TEMP, 2, new Buffer(2), (err, bytesRead, buffer) => {
        if(err) {
          return reject(err);
        }

        // Temperature
        let adc_T = SW10.uint16(buffer[0], buffer[1]);
        let temperature_C = (adc_T >> 5) / 8;

        resolve({
          temperature_C : temperature_C,
        });
      });
    });
  }

  static LM75_DEFAULT_I2C_ADDRESS() {
    return 0x48;
  }

  static uint16(msb, lsb) {
    return msb << 8 | lsb;
  }

  static convertCelciusToFahrenheit(c) { 
    return c * 9 / 5 + 32;
  }
}

module.exports = SW10;