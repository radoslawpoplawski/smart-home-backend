const dbConfig = require('./config/environment');
const mysql = require('mysql');
const Gpio = require('onoff').Gpio;
const dhtSensor = require('node-dht-sensor');
const pinoutConfig = {
  dhtIn: 4,
  dhtOut: 26
};

dhtSensor.read(22, pinoutConfig.dhtIn, (error, temperature, humidity) => {
  if (err) {
    console.log('error dht in');
    return;
  }
  console.log('temp-in', temperature.toFixed(1) + ' C');
  console.log('humi-in', humidity.toFixed(1) + ' %');
});

let con = mysql.createConnection(dbConfig);

con.connect(err => {
  if (err) {
    throw err;
  }
  con.query('SELECT * FROM users', (err, result) => {
    if (err) {
      throw err;
    }
    console.log('users', JSON.stringify(result[0]));
  })
});