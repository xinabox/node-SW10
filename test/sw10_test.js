process.env.NODE_ENV = 'test';

const chai   = require('chai');
const SW10 = require('../SW10.js');
const expect = chai.expect;

describe('node-SW10', () => {
  it('it should communicate with the device', (done) => {
    const SW10 = new SW10();
    expect(SW10).to.be.an.instanceof(SW10);
    SW10.init()
  });

  it('it should receive valid sensor data', (done) => {
    const SW10 = new SW10();
    expect(SW10).to.be.an.instanceof(SW10);
    SW10.init()
      .then(() => {
        return SW10.readSensorData();
      })
      .then((data) => {
        console.log(`SW10 sensor data: ${JSON.stringify(data)}`);
        expect(data).to.have.all.keys('temperature_C');
        expect(data.temperature_C).to.be.within(-40, 85); // per Bosch BME280 datasheet operating range
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});