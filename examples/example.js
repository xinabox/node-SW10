const SW10 = require('node-sw10');

const options = {
  i2cBusNo   : 1, // defaults to 1
  i2cAddress : SW10.LM75_DEFAULT_I2C_ADDRESS() // defaults to 0x48
};

const sw10 = new SW10(options);

// Read LM75 sensor data, repeat
const readSensorData = () => {
  sw10.readSensorData()
    .then((data) => {
      // temperature_C returned by default.
      // I'll also calculate some unit conversions for display purposes.
      data.temperature_F = SW10.convertCelciusToFahrenheit(data.temperature_C);

      console.log(`data = ${JSON.stringify(data, null, 1)}`);
      setTimeout(readSensorData, 2000);
    })
    .catch((err) => {
      console.log(`SW10 read error: ${err}`);
      setTimeout(readSensorData, 2000);
    });
};

// Initialize the BME280 sensor
//
sw10.init()
  .then(() => {
    console.log('LM75 initialization succeeded');
    readSensorData();
  })
  .catch((err) => console.error(`LM75 initialization failed: ${err} `));