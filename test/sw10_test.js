process.env.NODE_ENV = 'test';

const chai   = require('chai');
const SW10   = require('../SW10.js');
const expect = chai.expect;

describe('node-sw10', () => {
  it('it should communicate with the device', (done) => {
    const sw10 = new SW10();
    expect(sw10).to.be.an.instanceof(SW10);
    sw10.init()
    .catch((err) => {
      done(err);
    });
  });
  
  it('it should receive valid sensor data', (done) => {
    const sw10 = new SW10();
    expect(sw10).to.be.an.instanceof(SW10);
    sw10.init()
      .then(() => {
        return sw10.readSensorData();
      })
      .then((data) => {
        console.log(`SW10 sensor data: ${JSON.stringify(data)}`);
        expect(data).to.have.all.keys('temperature_C');
        expect(data.temperature_C).to.be.within(-55, 125);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});